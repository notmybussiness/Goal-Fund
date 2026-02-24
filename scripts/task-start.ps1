param(
  [Parameter(Mandatory = $true)]
  [string]$TaskId,

  [Parameter(Mandatory = $true)]
  [ValidateSet("feat", "fix", "chore", "docs")]
  [string]$Type,

  [Parameter(Mandatory = $true)]
  [string]$Topic,

  [switch]$CreateBranch
)

$ErrorActionPreference = "Stop"

function Normalize-Slug([string]$Value) {
  $slug = $Value.Trim().ToLowerInvariant()
  $slug = $slug -replace "[^a-z0-9]+", "-"
  $slug = $slug -replace "^-+", ""
  $slug = $slug -replace "-+$", ""
  if ([string]::IsNullOrWhiteSpace($slug)) {
    throw "Topic slug is empty after normalization."
  }
  return $slug
}

$rootPath = Resolve-Path (Join-Path $PSScriptRoot "..")
$taskIdNormalized = $TaskId.Trim().ToUpperInvariant()
$topicSlug = Normalize-Slug $Topic
$branchName = "$Type/$taskIdNormalized-$topicSlug"
$tddRequired = if ($Type -in @("feat", "fix")) { "Yes" } else { "No" }

$reportsDir = Join-Path $rootPath "docs/task-reports"
if (-not (Test-Path $reportsDir)) {
  New-Item -ItemType Directory -Path $reportsDir | Out-Null
}

$reportPath = Join-Path $reportsDir "$taskIdNormalized.md"
if (-not (Test-Path $reportPath)) {
  $template = @"
# Task Report: $taskIdNormalized

- Branch Type: $Type
- Branch Name: $branchName
- TDD Required: $tddRequired
- Status: In Progress

## Evidence

- RED Command:
- RED Summary:
- GREEN Command:
- GREEN Summary:
- Regression Test Added:

## Notes

- Pending update.
"@
  Set-Content -Path $reportPath -Value $template -Encoding UTF8
}

if ($CreateBranch) {
  $currentBranch = (git rev-parse --abbrev-ref HEAD).Trim()
  if ($currentBranch -ne $branchName) {
    git checkout -b $branchName | Out-Null
  }
}

Write-Host "Task start prepared."
Write-Host "Task ID       : $taskIdNormalized"
Write-Host "Branch Type   : $Type"
Write-Host "Branch Name   : $branchName"
Write-Host "TDD Required  : $tddRequired"
Write-Host "Report File   : $reportPath"
Write-Host "Next Step     : scripts/task-report.ps1 -TaskId $taskIdNormalized -Type $Type ..."

