param(
  [Parameter(Mandatory = $true)]
  [string]$TaskId,

  [Parameter(Mandatory = $true)]
  [ValidateSet("feat", "fix", "chore", "docs")]
  [string]$Type,

  [string]$RedCommand,
  [string]$RedSummary,
  [string]$GreenCommand,
  [string]$GreenSummary,

  [ValidateSet("Yes", "No", "N/A")]
  [string]$RegressionTestAdded = "N/A",

  [string]$Notes = ""
)

$ErrorActionPreference = "Stop"

function Require-Value([string]$Value, [string]$Name) {
  if ([string]::IsNullOrWhiteSpace($Value)) {
    throw "Missing required value: $Name"
  }
}

$rootPath = Resolve-Path (Join-Path $PSScriptRoot "..")
$taskIdNormalized = $TaskId.Trim().ToUpperInvariant()
$reportsDir = Join-Path $rootPath "docs/task-reports"
if (-not (Test-Path $reportsDir)) {
  New-Item -ItemType Directory -Path $reportsDir | Out-Null
}

$reportPath = Join-Path $reportsDir "$taskIdNormalized.md"
$tddRequired = $Type -in @("feat", "fix")

if ($tddRequired) {
  Require-Value $RedCommand "RedCommand"
  Require-Value $RedSummary "RedSummary"
  Require-Value $GreenCommand "GreenCommand"
  Require-Value $GreenSummary "GreenSummary"
}

if ($Type -eq "fix" -and $RegressionTestAdded -ne "Yes") {
  throw "fix branches must set -RegressionTestAdded Yes"
}

$now = Get-Date -Format "yyyy-MM-dd HH:mm:ss K"
$redCommandValue = if ($RedCommand) { $RedCommand } else { "N/A" }
$redSummaryValue = if ($RedSummary) { $RedSummary } else { "N/A" }
$greenCommandValue = if ($GreenCommand) { $GreenCommand } else { "N/A" }
$greenSummaryValue = if ($GreenSummary) { $GreenSummary } else { "N/A" }
$noteValue = if ($Notes) { $Notes } else { "No additional notes." }

$content = @"
# Task Report: $taskIdNormalized

- Updated At: $now
- Branch Type: $Type
- TDD Required: $(if ($tddRequired) { "Yes" } else { "No" })
- Status: Reported

## Evidence

- RED Command: $redCommandValue
- RED Summary: $redSummaryValue
- GREEN Command: $greenCommandValue
- GREEN Summary: $greenSummaryValue
- Regression Test Added: $RegressionTestAdded

## Notes

- $noteValue
"@

Set-Content -Path $reportPath -Value $content -Encoding UTF8

Write-Host "Task report saved: $reportPath"
Write-Host "Use scripts/task-pr.ps1 -TaskId $taskIdNormalized -Type $Type before creating PR."

