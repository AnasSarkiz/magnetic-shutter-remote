# Actual reference enclosure0.3.18 publication — native draft incomplete

GitHub source/artifacts are public and pushed on
board/r8-doit-c3-prototype-20261005. Source/artifact commit:
[92ca999b362bde1f2c50eb233f57d0b3ad22f74b](https://github.com/AnasSarkiz/magnetic-shutter-remote/commit/92ca999b362bde1f2c50eb233f57d0b3ad22f74b).
All28 critical anonymous source/artifact byte reads match. Frozen origin main
remains5951f419c8314b83648d89e1cfb7e29e87e32eb8. Later receipt-only commits do
not change these tested source/build bytes.

Native destination:
[0.3.18-prototype](https://tscircuit.com/AnasSarkiz/magnetic-shutter-remote-r8).
The normal authenticated, guarded tsci push ran from the exact selected staging
folder with --include-dist --version-tag prototype. No token was read/exported,
no proxy bypass and no root board build. Actual CLI exit1:287 uploads reported
successful, four reportedHTTP502 at POST/package_files/create:

- imports/ESPC3_12_N4/ESPC3_12_N4.step
- imports/TS24CA/TS24CA.step
- product/models/r8-parts-6.glb
- tooling/vendor/easyeda-converter-r7-circular-paste-v2.tgz

Anonymous actual readback shows290/291 expected files, no extras/duplicates.
The two STEP files and tooling archive are present and byte-exact despite
failed responses. Only product/models/r8-parts-6.glb is absent. Sixty-two
available critical text/binary files match exact staged SHA256s, including the
other PCB fragments, eight prints, native assembly JSONs, electronics/copper/
BOM/Gerbers and the reported-failed-but-stored files. Every staging hash remains
unchanged. ready_to_build=false/display_status=pending; no hosted preview pass
or completed native publication is claimed. Full receipt is in
registry-upload-observation.json. Safe upload summary is in native-upload.log;
raw CLI/service diagnostics remain outside the repository.

CLI peak child RSS850916KiB, observed cgroup32GiB, no OOM-counter increase.
The exact service host is registry-api.tscircuit.com;HTTP502 is a service upload
failure, not established memory exhaustion or an allowlist denial. The earlier
HTTP413 oversized-model issue is not observed for this candidate.

Supported push help provides private/version-tag/include-dist/compress flags;
there is no existing-release resume option. Repeating push would bump the
occupied version. Complete the missing upload through an official authenticated
publisher supporting existing-release repair, or fix/resume support in that
publisher, then verify the complete inventory and bytes before finalization.
Do not remove the model, extract credentials, weaken checks or mark this draft
ready. Existing local issue099 records the registry failure separately from
board correctness and missing3V3metadata. The complete enclosure remains
available in GitHub/local files. Physical fit and ordering gates remain pending.
