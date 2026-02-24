param(
  [switch]$IncludeE2E
)

$ErrorActionPreference = "Stop"

function Invoke-Checked([scriptblock]$Command, [string]$Name) {
  & $Command
  if ($LASTEXITCODE -ne 0) {
    throw "$Name failed with exit code $LASTEXITCODE"
  }
}

$backendPath = Join-Path $PSScriptRoot "..\backend"
$frontendPath = Join-Path $PSScriptRoot "..\frontend"

Write-Host "[Self Verify] backend test"
Push-Location $backendPath
try {
  $gradleCommand = Get-Command gradle -ErrorAction SilentlyContinue
  if ($null -ne $gradleCommand) {
    Write-Host "[Self Verify] using local Gradle"
    Invoke-Checked { gradle test } "gradle test"
  } else {
    $dockerCommand = Get-Command docker -ErrorAction SilentlyContinue
    if ($null -eq $dockerCommand) {
      throw "Neither 'gradle' nor 'docker' is available for backend verification."
    }

    Write-Host "[Self Verify] using Gradle Docker image"
    Invoke-Checked { docker run --rm -v "${PWD}:/workspace" -w /workspace gradle:8.10.2-jdk21 gradle test } "docker gradle test"
  }
}
finally {
  Pop-Location
}

Write-Host "[Self Verify] frontend install/test/lint/build"
Push-Location $frontendPath
try {
  Invoke-Checked { npm ci } "npm ci"
  Invoke-Checked { npm run test } "npm run test"
  Invoke-Checked { npm run lint } "npm run lint"
  Invoke-Checked { npm run build } "npm run build"
  if ($IncludeE2E) {
    Invoke-Checked { npm run test:e2e } "npm run test:e2e"
  }
}
finally {
  Pop-Location
}

Write-Host "[Self Verify] completed"
