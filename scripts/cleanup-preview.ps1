param(
    [switch]$Delete,
    [switch]$VerboseOutput
)

$cwd = Get-Location
$scriptDir = Join-Path $cwd "scripts"
if (-not (Test-Path $scriptDir)) { New-Item -ItemType Directory -Path $scriptDir | Out-Null }

$patterns = @(
    "*.log",
    "*.bak",
    "*.tmp",
    "*.old",
    "*~",
    ".DS_Store",
    "thumbs.db",
    ".env",
    "*.zip",
    "*.tar",
    "*.gz",
    "*.sqlite",
    "*.db"
)
$dirPatterns = @(
    "node_modules",
    ".vscode"
)

Write-Output "Scanning repository for common unwanted files (preview-only by default)..."

$results = [System.Collections.Generic.List[object]]::new()

foreach ($d in Get-ChildItem -Path . -Recurse -Force -ErrorAction SilentlyContinue) {
    try {
        if ($d.PSIsContainer) {
            foreach ($dp in $dirPatterns) {
                if ($d.Name -ieq $dp) { $results.Add($d); break }
            }
        } else {
            foreach ($p in $patterns) {
                if ($d.Name -like $p) { $results.Add($d); break }
            }
        }
    } catch {
        continue
    }
}

# Deduplicate
$unique = $results | Select-Object -Unique -Property FullName

$reportPath = Join-Path $scriptDir "cleanup-report.txt"
"Cleanup preview report generated on $(Get-Date -Format o)" | Out-File -FilePath $reportPath -Encoding utf8
"Preview mode: Deletions are NOT performed unless you pass -Delete`n" | Out-File -FilePath $reportPath -Append -Encoding utf8

if ($unique.Count -eq 0) {
    "No candidate files or folders found." | Tee-Object -FilePath $reportPath -Append
    Write-Output "No candidate files or folders found. See $reportPath"
    exit 0
}

"Found $($unique.Count) candidate items:`n" | Tee-Object -FilePath $reportPath -Append
foreach ($item in $unique) {
    $line = $item.FullName
    $line | Tee-Object -FilePath $reportPath -Append
}

Write-Output "Preview complete: $($unique.Count) candidate items found. Report saved to $reportPath"

if ($Delete) {
    Write-Output "-- Delete requested: performing removals --"
    foreach ($item in $unique) {
        try {
            if ($item.PSIsContainer) { Remove-Item -LiteralPath $item.FullName -Recurse -Force -ErrorAction Stop }
            else { Remove-Item -LiteralPath $item.FullName -Force -ErrorAction Stop }
            Write-Output "Deleted: $($item.FullName)"
        } catch {
            Write-Output "Failed to delete: $($item.FullName) -- $($_.Exception.Message)"
        }
    }
    Write-Output "Deletion run finished." 
} else {
    Write-Output "No deletions performed. To delete these items, rerun with -Delete." 
}

if ($VerboseOutput) { Get-Content -Path $reportPath | Write-Output }
