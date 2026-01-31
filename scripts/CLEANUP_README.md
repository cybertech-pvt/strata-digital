This folder contains a preview-only cleanup script for the repository.

Usage (PowerShell, Windows):

1. Preview (safe - does not delete):

   powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\cleanup-preview.ps1

2. Preview with verbose report printed to console:

   powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\cleanup-preview.ps1 -VerboseOutput

3. Delete the found items (UNSAFE — make sure you reviewed the `scripts/cleanup-report.txt`):

   powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\cleanup-preview.ps1 -Delete

Notes:
- The script looks for common junk (logs, backups, editor folders, `node_modules`, `.vscode`, etc.).
- By default the script writes a preview report to `scripts/cleanup-report.txt` and does not remove files.
- Edit the script to add or remove patterns if you have project-specific rules.
