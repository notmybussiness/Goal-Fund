param(
  [Parameter(Mandatory = $true)]
  [string]$TaskId,

  [Parameter(Mandatory = $true)]
  [ValidateSet("feat", "fix", "chore", "docs")]
  [string]$Type
)

$ErrorActionPreference = "Stop"

function Get-FieldValue([string[]]$Lines, [string]$Field) {
  $match = $Lines | Where-Object { $_ -match "^- ${Field}:\s*(.*)$" } | Select-Object -First 1
  if (-not $match) {
    return ""
  }
  return ($match -replace "^- ${Field}:\s*", "").Trim()
}

$rootPath = Resolve-Path (Join-Path $PSScriptRoot "..")
$taskIdNormalized = $TaskId.Trim().ToUpperInvariant()
$taskPath = Join-Path $rootPath "docs/TASK.md"
$reportPath = Join-Path $rootPath "docs/task-reports/$taskIdNormalized.md"
$tddRequired = $Type -in @("feat", "fix")

if (-not (Test-Path $taskPath)) {
  throw "TASK ledger not found: $taskPath"
}

$taskContent = Get-Content -Path $taskPath
$taskHeaderPattern = "^##\s+$([regex]::Escape($taskIdNormalized))(\s|$|-)"
if (-not ($taskContent | Select-String -Pattern $taskHeaderPattern)) {
  throw "Task ID '$taskIdNormalized' not found in docs/TASK.md"
}

if (-not (Test-Path $reportPath)) {
  throw "Task report not found: $reportPath. Run scripts/task-report.ps1 first."
}

$reportLines = Get-Content -Path $reportPath

if ($tddRequired) {
  $redCommand = Get-FieldValue $reportLines "RED Command"
  $redSummary = Get-FieldValue $reportLines "RED Summary"
  $greenCommand = Get-FieldValue $reportLines "GREEN Command"
  $greenSummary = Get-FieldValue $reportLines "GREEN Summary"

  foreach ($pair in @(
      @{ Name = "RED Command"; Value = $redCommand },
      @{ Name = "RED Summary"; Value = $redSummary },
      @{ Name = "GREEN Command"; Value = $greenCommand },
      @{ Name = "GREEN Summary"; Value = $greenSummary }
    )) {
    if ([string]::IsNullOrWhiteSpace($pair.Value) -or $pair.Value -eq "N/A") {
      throw "PR gate failed: missing TDD evidence field '$($pair.Name)' in $reportPath"
    }
  }
}

if ($Type -eq "fix") {
  $regression = Get-FieldValue $reportLines "Regression Test Added"
  if ($regression -ne "Yes") {
    throw "PR gate failed: fix branch requires 'Regression Test Added: Yes'."
  }
}

$currentBranch = (git rev-parse --abbrev-ref HEAD).Trim()
if ($currentBranch -notlike "$Type/$taskIdNormalized-*") {
  Write-Warning "Current branch '$currentBranch' does not match expected prefix '$Type/$taskIdNormalized-*'."
}

Write-Host "PR gate passed for task $taskIdNormalized."
Write-Host "Branch: $currentBranch"
Write-Host "Report: $reportPath"
Write-Host "You can now open/update PR after user confirmation."
