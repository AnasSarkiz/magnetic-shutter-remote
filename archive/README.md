# Recoverable historical source

The active R8 source is four files in `src/`, plus the root PCB entrypoint.
35 live trace modules were consolidated without changing their36 runtime
exports. The source archive includes those original modules and four unused
legacy/ring modules. Frozen baselines and previous validation evidence remain
unchanged.

- `legacy-source-2026-10-07.tar.gz`:39 exact original source files.
- `legacy-mechanics-and-views-2026-10-07.tar.gz`: old Nordic mechanical files,
  external-parts/phone procedure and obsolete guide-page previews.
- Manifests record the archive and original file SHA256 hashes.

Recover into a separate review directory with `tar -xzf <archive> -C <directory>`.
Do not overwrite an active task or execute the historical board as R8.
Historical scripts referring to removed mechanical paths require these
recovered inputs. This preserves reproduction while keeping current CAD clear.
