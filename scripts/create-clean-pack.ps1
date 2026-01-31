param(
    [string]$OutputName,
    [switch]$VerboseOutput
)

$root = Get-Location
if (-not $OutputName) { $timestamp = Get-Date -Format "yyyyMMddHHmmss"; $OutputName = "strata-digital-1-clean-$timestamp.zip" }
$excludeNames = @('.git','node_modules','.vscode','.env','bun.lockb')

$temp = Join-Path $root "scripts\pack-temp-$([guid]::NewGuid().ToString())"
if (Test-Path $temp) { Remove-Item -Recurse -Force $temp }
New-Item -ItemType Directory -Path $temp | Out-Null

Write-Output "Packing repository to $OutputName (excluding: $($excludeNames -join ', '))"

# Copy top-level items except excluded ones
Get-ChildItem -Force | ForEach-Object {
    $name = $_.Name
    if ($excludeNames -contains $name) {
        if ($VerboseOutput) { Write-Output "Skipping $name" }
        return
    }
    $dest = Join-Path $temp $name
    try {
        Copy-Item -Path $_.FullName -Destination $dest -Recurse -Force -ErrorAction Stop
        if ($VerboseOutput) { Write-Output "Copied $name" }
    } catch {
        $errMsg = $_.Exception.Message
        Write-Output ("Warning: failed to copy " + $name + ": " + $errMsg)
    }
}

$destZip = Join-Path $root $OutputName
if (Test-Path $destZip) { Remove-Item -Force $destZip }
Compress-Archive -Path (Join-Path $temp "*") -DestinationPath $destZip -CompressionLevel Optimal
$size = (Get-Item $destZip).Length

# Cleanup temp
Remove-Item -Recurse -Force $temp

Write-Output "Created $destZip ($([math]::Round($size/1KB,2)) KB)"
if ($VerboseOutput) { Get-ChildItem -Path $destZip | Format-List }
