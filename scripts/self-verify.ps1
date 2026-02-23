$ErrorActionPreference = "Stop"

$backendPath = Join-Path $PSScriptRoot "..\backend"
$frontendPath = Join-Path $PSScriptRoot "..\frontend"

Write-Host "[Self Verify] backend test"
Push-Location $backendPath
try {
  $gradleCommand = Get-Command gradle -ErrorAction SilentlyContinue
  if ($null -ne $gradleCommand) {
    Write-Host "[Self Verify] using local Gradle"
    gradle test
  } else {
    $dockerCommand = Get-Command docker -ErrorAction SilentlyContinue
    if ($null -eq $dockerCommand) {
      throw "Neither 'gradle' nor 'docker' is available for backend verification."
    }

    Write-Host "[Self Verify] using Gradle Docker image"
    docker run --rm -v "${PWD}:/workspace" -w /workspace gradle:8.10.2-jdk21 gradle test
  }
}
finally {
  Pop-Location
}

Write-Host "[Self Verify] frontend install/lint/build"
Push-Location $frontendPath
try {
  npm ci
  npm run lint
  npm run build
}
finally {
  Pop-Location
}

Write-Host "[Self Verify] completed"
