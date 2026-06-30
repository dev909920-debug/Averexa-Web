param(
  [switch]$Force
)

Write-Host "=== Checking for updates on GitHub ===" -ForegroundColor Cyan

git fetch origin main
if (-not $?) {
  Write-Host "Failed to fetch from GitHub. Check your internet connection." -ForegroundColor Red
  exit 1
}

$behind = git rev-list --count HEAD..origin/main
if ($behind -eq 0) {
  Write-Host "Already up to date." -ForegroundColor Green
  exit 0
}

Write-Host "Found $behind new commit(s) behind origin/main:" -ForegroundColor Yellow
git log --oneline HEAD..origin/main

if (-not $Force) {
  $confirm = Read-Host "Pull these changes? (y/N)"
  if ($confirm -ne "y" -and $confirm -ne "Y") {
    Write-Host "Aborted." -ForegroundColor Red
    exit 0
  }
}

Write-Host "Pulling changes..." -ForegroundColor Cyan
git pull origin main
if ($?) {
  Write-Host "Done. Project is now up to date." -ForegroundColor Green
} else {
  Write-Host "Pull failed (maybe merge conflicts). Resolve manually then run: git pull origin main" -ForegroundColor Red
}
