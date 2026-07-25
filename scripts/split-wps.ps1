# split-wps.ps1
# Parses .docs/07-refactoring-roadmap.md and extracts each Work Package
# into a separate file under .docs/WPs/

$root      = $PSScriptRoot | Split-Path -Parent
$roadmap   = Join-Path $root ".docs\07-refactoring-roadmap.md"
$outputDir = Join-Path $root ".docs\WPs"

if (-not (Test-Path $roadmap)) {
    Write-Error "Roadmap not found: $roadmap"
    exit 1
}

New-Item -ItemType Directory -Path $outputDir -Force | Out-Null

$lines = Get-Content $roadmap -Encoding UTF8
$total = $lines.Count

$wpFiles  = [System.Collections.Specialized.OrderedDictionary]::new()
$phaseMap = @{}

$current      = $null
$currentPhase = "Unknown"
$buffer       = [System.Collections.Generic.List[string]]::new()

for ($i = 0; $i -lt $total; $i++) {
    $line = $lines[$i]

    # Track phase headers: "## N. Work Packages — PHASE-XX: ..."
    if ($line -match '## \d+\. Work Packages') {
        if ($line -match 'PHASE-(\d+): (.+)') {
            $currentPhase = "PHASE-$($Matches[1]): $($Matches[2])"
        } elseif ($line -match 'PHASE-(\d+)') {
            $currentPhase = "PHASE-$($Matches[1])"
        }
    }

    # Detect WP header: "### WP-NNNN - ..." (dash or em-dash)
    if ($line -match '^### (WP-\d{4})\s*[-\u2014]') {
        # Save previous WP
        if ($current) {
            $wpFiles[$current] = $buffer.ToArray()
        }
        $current = $Matches[1]
        $phaseMap[$current] = $currentPhase
        $buffer = [System.Collections.Generic.List[string]]::new()
        $buffer.Add($line)
    }
    elseif ($current) {
        # Stop at next h2 or h3 that isn't a WP header
        if ($line -match '^#{2,3} ' -and $line -notmatch '^### WP-\d{4}') {
            $wpFiles[$current] = $buffer.ToArray()
            $current = $null
            $buffer  = [System.Collections.Generic.List[string]]::new()
        }
        else {
            $buffer.Add($line)
        }
    }
}
if ($current -and $buffer.Count -gt 0) {
    $wpFiles[$current] = $buffer.ToArray()
}

# Write files
$count = 0
foreach ($wpId in $wpFiles.Keys) {
    $phase    = if ($phaseMap[$wpId]) { $phaseMap[$wpId] } else { "Unknown Phase" }
    $content  = $wpFiles[$wpId]
    $filePath = Join-Path $outputDir "$wpId.md"

    $header = @(
        "# $wpId",
        "",
        "> **Phase:** $phase",
        "> **Roadmap:** [07-refactoring-roadmap.md](../07-refactoring-roadmap.md)",
        "",
        "---",
        ""
    )

    ($header + $content) | Set-Content -Path $filePath -Encoding UTF8
    Write-Host "  $wpId.md  [$phase]"
    $count++
}

Write-Host ""
Write-Host "Done. $count WP files -> $outputDir"
