import { countPcbTraces } from "lib/package_release/count-pcb-traces"
import { canAccountManagePackage } from "lib/auth/package-permissions"
import { findPackageReleaseId } from "lib/package_release/find-package-release-id"
import { getR2ObjectUploadUrl } from "lib/storage/get-r2-object-upload-url"
import { normalizeProjectFilePathAndValidate } from "lib/utils/normalize-project-file-path"
import { withWinterSpec } from "lib/with-winter-spec"
import * as ZT from "lib/zod"
import mime from "mime-types"
import { z } from "zod"

export default withWinterSpec({
  methods: ["POST"],
  auth: "session",
  jsonBody: z
    .object({
      file_path: z.string(),
      is_release_tarball: z.boolean().optional().default(false),
      content_mimetype: z.string().optional(),
      content_text: z.string().optional(),
      content_base64: z.string().optional(),
      package_release_id: z.string().uuid().optional(),
      r2_path: z.string().optional(),
      static_url: z.string().optional(),
      file_size_kb: z.number().optional(),
      generate_upload_url: z.boolean().optional().default(false),
      package_name_with_version: z
        .string()
        .regex(/^.+@.+/)
        .optional(),
      npm_pack_output: z
        .any()
        .optional()
        .transform((v) => {
          if (typeof v === "string") {
            return JSON.parse(v)
          }
          return v
        }),
    })
    .refine((v) => {
      if (v.package_release_id) return true
      if (v.package_name_with_version) return true
      return false
    }, "Must specify either package_release_id or package_name_with_version")
    .refine((v) => {
      if (v.package_release_id && v.package_name_with_version) return false
      return true
    }, "Cannot specify both package_release_id and package_name_with_version")
    .refine((v) => {
      if (!v.content_base64 && !v.content_text) return true
      if (v.content_base64 && v.content_text) return false
      return true
    }, "content_base64 and content_text cannot both be provided"),
  jsonResponse: z.object({
    ok: z.boolean(),
    package_file: ZT.public_package_file.extend({
      upload_url: z.string().nullable().optional(),
    }),
  }),
})(async (req, ctx) => {
  const {
    file_path,
    content_mimetype: provided_content_mimetype,
    content_base64,
    content_text,
    is_release_tarball,
    npm_pack_output,
    r2_path,
    static_url,
    file_size_kb,
    generate_upload_url,
  } = req.jsonBody

  if (!is_release_tarball && npm_pack_output) {
    return ctx.error(404, {
      error_code: "invalid_options",
      message: "npm_pack_output is only valid for release tarballs",
    })
  }

  if (is_release_tarball && !npm_pack_output) {
    return ctx.error(400, {
      error_code: "missing_options",
      message: "npm_pack_output is required for release tarballs",
    })
  }

  const package_release_id =
    req.jsonBody.package_release_id ??
    (await findPackageReleaseId(req.jsonBody.package_name_with_version!, ctx))

  if (!package_release_id) {
    return ctx.error(404, {
      error_code: "package_release_not_found",
      message: "Package release not found",
    })
  }

  // Check ownership
  const packageRelease = await ctx.db
    .selectFrom("main.package_release")
    .innerJoin(
      "main.package",
      "main.package.package_id",
      "main.package_release.package_id",
    )
    .select([
      "main.package.owner_org_id",
      "main.package_release.active_package_build_id",
    ])
    .where("package_release_id", "=", package_release_id)
    .executeTakeFirst()

  if (!packageRelease) {
    // This case should ideally not happen if findPackageReleaseId succeeded,
    // but adding a check for robustness.
    return ctx.error(404, {
      error_code: "package_release_not_found",
      message: "Package release not found after initial check",
    })
  }

  const canManagePackage = await canAccountManagePackage(
    { org_id: packageRelease.owner_org_id },
    ctx,
  )

  if (!canManagePackage) {
    return ctx.error(403, {
      error_code: "forbidden",
      message:
        "You do not have permission to add files to this package release",
    })
  }

  const content_mimetype =
    provided_content_mimetype ||
    (file_path.endsWith(".ts") || file_path.endsWith(".tsx")
      ? "text/typescript"
      : null) ||
    mime.lookup(file_path) ||
    "application/octet-stream"

  const normalizedFilePath = normalizeProjectFilePathAndValidate(file_path)

  let decodedContent: Buffer
  if (content_base64 === undefined && content_text === undefined) {
    decodedContent = Buffer.from("")
  } else if (content_text !== undefined) {
    decodedContent = Buffer.from(content_text)
  } else if (content_base64 !== undefined) {
    decodedContent = Buffer.from(content_base64, "base64")
  } else {
    throw new Error(
      "Invalid input: both content_base64 and content_text are undefined",
    )
  }

  let uploadR2Path: string | null = r2_path ?? null
  let resolvedPackageBuildId: string | null = null

  if (generate_upload_url) {
    const packageBuild = await ctx.db
      .selectFrom("main.package_build")
      .select("package_build_id")
      .where("package_release_id", "=", package_release_id)
      .orderBy("created_at", "desc")
      .executeTakeFirst()

    resolvedPackageBuildId =
      packageRelease.active_package_build_id ??
      packageBuild?.package_build_id ??
      null

    if (!resolvedPackageBuildId) {
      return ctx.error(400, {
        error_code: "package_build_not_found",
        message:
          "Cannot generate upload URL because the package release has no build",
      })
    }

    uploadR2Path = `/orgs/${packageRelease.owner_org_id}/builds/${resolvedPackageBuildId}/files/${normalizedFilePath}`
  }

  const newPackageFile = await ctx.db
    .insertInto("main.package_file")
    .values({
      package_release_id,
      file_path: normalizedFilePath,
      is_text: Boolean(content_text),
      content_mimetype,
      content_text,
      content_bytes: decodedContent,
      is_release_tarball,
      npm_pack_output: npm_pack_output,
      r2_path: uploadR2Path,
      static_url,
      file_size_kb,
    })
    .returning([
      "package_file_id",
      "package_release_id",
      "content_mimetype",
      "file_path",
      "created_at",
    ])
    .executeTakeFirstOrThrow()

  if (
    ["dist/circuit.json", "dist/index/circuit.json"].includes(
      normalizedFilePath,
    )
  ) {
    await ctx.db
      .updateTable("main.package_release")
      .set({
        pcb_trace_count: countPcbTraces(
          content_text ?? decodedContent?.toString("utf8"),
        ),
      })
      .where("package_release_id", "=", package_release_id)
      .execute()
  }

  const uploadUrl =
    generate_upload_url && uploadR2Path
      ? await getR2ObjectUploadUrl({
          key: uploadR2Path,
          method: "PUT",
          presign: true,
          env: ctx.env,
        })
      : null

  return ctx.json({
    ok: true,
    package_file: {
      ...newPackageFile,
      upload_url: uploadUrl,
      created_at: newPackageFile.created_at.toISOString(),
    },
  })
})
