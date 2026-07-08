# smartSave.ps1 - Interactive menu for Generate, Backup, and Generate + Backup operations

function Info($m) { Write-Host $m -ForegroundColor Cyan }
function Success($m) { Write-Host $m -ForegroundColor Green }
function Warn($m) { Write-Host $m -ForegroundColor Yellow }
function Err($m) { Write-Host $m -ForegroundColor Red }

# In-session backup activity log (kept while the script runs)
$BackupLog = @()

function Add-BackupLogEntry($name, $timestamp) {
  $entry = [PSCustomObject]@{
    Number = ($BackupLog.Count + 1)
    Name = $name
    CreatedAt = $timestamp
  }
  $BackupLog += $entry
}

function Get-RecentBackupLog([int]$count = 8) {
  if ($BackupLog.Count -eq 0) { return @() }
  return $BackupLog | Select-Object -Last $count
}


# Go to script directory to ensure relative paths resolve correctly
if ($PSScriptRoot) {
    Set-Location -Path $PSScriptRoot
}

# ===== MENU =====
function Show-Menu {
  Clear-Host
  Write-Host ""
  Write-Host "========================================" -ForegroundColor Magenta
  Write-Host "          smartSave Utility             " -ForegroundColor Magenta
  Write-Host "========================================" -ForegroundColor Magenta
  Write-Host ""
  Write-Host "  [3] Backup Project (npm run backup)"
  Write-Host "  [5] Backup with Comment (src_date_time_COMMENT)"
  Write-Host "  [7] Restore Backup"
  
  Write-Host ""
  Write-Host "  [ESC] Exit"
  Write-Host ""
  Write-Host "========================================" -ForegroundColor Magenta
  Write-Host "Please select an option: " -NoNewline
  Write-Host "" 
  Write-Host "Recent Backups (this session):" -ForegroundColor Cyan
  $recent = Get-RecentBackupLog 8
  if ($recent.Count -gt 0) {
    foreach ($e in $recent) {
      $marker = ''
      if ($e.Number -eq $global:BackupLog.Count) { $marker = ' <- latest' }
      Write-Host "  [$($e.Number)] $($e.Name)  $($e.CreatedAt)$marker"
    }
  } else {
    Write-Host "  (no backups yet this session)" -ForegroundColor Yellow
  }

  
}

# Add an entry to the in-memory backup log
# (Add-BackupLogEntry defined earlier)

# ===== OPERATION 2: Backup =====
function Invoke-Backup {
  Info ""
  Info "Starting Backup..."
  Info "> node ./backup.js"
  # Capture output so we can parse machine-readable success line
  $output = & node ./backup.js 2>&1
  $exit = $LASTEXITCODE
  if ($exit -ne 0) {
    Err "[!] Backup Failed!"
    return $false
  }

  # Parse output for the SMARTSAVE_BACKUP marker printed by the Node script
  foreach ($line in $output) {
    if ($line -match 'SMARTSAVE_BACKUP:\s*(.+)\s*\|\s*(.+)') {
      $bname = $matches[1].Trim()
      $bts = $matches[2].Trim()
      Add-BackupLogEntry $bname $bts
      break
    }
  }
  Success "[OK] Backup Successful: $bname"
  return $true
}

# ===== OPERATION 5: Backup with Comment =====
function Invoke-BackupWithComment {
  Info ""
  Write-Host "Enter a short comment for this backup (letters, digits, hyphens only): " -NoNewline -ForegroundColor Cyan
  $comment = Read-Host

  # Sanitize: keep only alphanumeric and hyphen characters
  $comment = $comment -replace '[^a-zA-Z0-9\-]', ''

  if ([string]::IsNullOrWhiteSpace($comment)) {
    Warn "[!] No comment entered. Running standard backup instead."
    return Invoke-Backup
  }

  Info ""
  Info "Starting Backup with comment '$comment'..."
  Info "> node ./backup.js --step $comment"
  $output = & node ./backup.js --step $comment 2>&1
  $exit = $LASTEXITCODE
  if ($exit -ne 0) {
    Err "[!] Backup Failed!"
    return $false
  }

  foreach ($line in $output) {
    if ($line -match 'SMARTSAVE_BACKUP:\s*(.+)\s*\|\s*(.+)') {
      $bname = $matches[1].Trim()
      $bts = $matches[2].Trim()
      Add-BackupLogEntry -name $bname -timestamp $bts
      break
    }
  }

  Success "[OK] Backup Successful: $bname"
  return $true
}

# ===== OPERATION 7: Restore Backup =====
function Invoke-RestoreBackup {
  param(
    [PSCustomObject]$selectedBackup
  )

  $projectRoot = Split-Path -Path $PSScriptRoot -Parent
  $parentDir = Split-Path -Path $projectRoot -Parent
  $backupFolder = Join-Path $parentDir $selectedBackup.Name

  Info ""
  Info "Validating backup at $backupFolder..."
  
  if (-not (Test-Path $backupFolder -PathType Container)) {
    Err "Validation failed: Backup folder does not exist at $backupFolder"
    return $false
  }

  $actualFolderName = Split-Path -Path $backupFolder -Leaf
  if ($actualFolderName -ne $selectedBackup.Name) {
    Err "Validation failed: Folder name mismatch ($actualFolderName vs $($selectedBackup.Name))"
    return $false
  }

  Success "Validation succeeded. Starting restoration..."
  
  $itemsToRemove = @(
    "src",
    "package.json",
    "package-lock.json",
    "app.config.js",
    "babel.config.js",
    "metro.config.js",
    "tsconfig.json",
    "eslint.config.js",
    "expo-env.d.ts",
    ".gitignore"
  )

  Info "Removing current project files..."
  foreach ($item in $itemsToRemove) {
    $targetPath = Join-Path $projectRoot $item
    if (Test-Path $targetPath) {
      Remove-Item -Path $targetPath -Recurse -Force
    }
  }

  Info "Copying backup files..."
  $srcBackup = Join-Path $backupFolder "src"
  if (Test-Path $srcBackup) {
    Copy-Item -Path $srcBackup -Destination (Join-Path $projectRoot "src") -Recurse -Force
  }

  foreach ($item in $itemsToRemove) {
    if ($item -ne "src") {
      $srcFile = Join-Path $backupFolder $item
      if (Test-Path $srcFile) {
        Copy-Item -Path $srcFile -Destination (Join-Path $projectRoot $item) -Force
      }
    }
  }

  Success "Restoration complete! Closing application..."
  Start-Sleep -Seconds 2
  exit 0
}

function Invoke-RestoreBackupMenu {
  $logPath = Join-Path $PSScriptRoot "log\backup-history.log"
  if (-not (Test-Path $logPath)) {
    Warn ""
    Warn "No backup history log found."
    return $false
  }

  $lines = @(Get-Content $logPath) | Where-Object { -not [string]::IsNullOrWhiteSpace($_) }
  if ($lines.Count -eq 0) {
    Warn ""
    Warn "No backup history records found."
    return $false
  }

  $backups = @()
  foreach ($line in $lines) {
    if ($line -match '(.+?)\s*\|\s*(.+)') {
      $backups += [PSCustomObject]@{
        Timestamp = $matches[1].Trim()
        Name = $matches[2].Trim()
      }
    }
  }

  if ($backups.Count -eq 0) {
    Warn ""
    Warn "No valid backup history records parsed."
    return $false
  }

  $selectedIndex = 0
  $running = $true

  while ($running) {
    Clear-Host
    Write-Host "========================================" -ForegroundColor Magenta
    Write-Host "         Restore Backup Utility         " -ForegroundColor Magenta
    Write-Host "========================================" -ForegroundColor Magenta
    Write-Host "Use [UP/DOWN ARROWS] to navigate, [ENTER] to restore, [ESC] to cancel."
    Write-Host ""

    for ($i = 0; $i -lt $backups.Count; $i++) {
      $b = $backups[$i]
      if ($i -eq $selectedIndex) {
        Write-Host " > [$($b.Timestamp)] $($b.Name)" -ForegroundColor Green -BackgroundColor DarkGray
      } else {
        Write-Host "   [$($b.Timestamp)] $($b.Name)"
      }
    }

    $key = [Console]::ReadKey($true)
    if ($key.Key -eq [ConsoleKey]::UpArrow) {
      $selectedIndex = ($selectedIndex - 1 + $backups.Count) % $backups.Count
    }
    elseif ($key.Key -eq [ConsoleKey]::DownArrow) {
      $selectedIndex = ($selectedIndex + 1) % $backups.Count
    }
    elseif ($key.Key -eq [ConsoleKey]::Escape) {
      $running = $false
      return $false
    }
    elseif ($key.Key -eq [ConsoleKey]::Enter) {
      $running = $false
      Invoke-RestoreBackup $backups[$selectedIndex]
      return $true
    }
  }
}

# ===== MAIN LOOP =====
$continue = $true
while ($continue) {
  Show-Menu
  
  # Wait for key press
  $key = [Console]::ReadKey($true)
  
  if ($key.Key -eq [ConsoleKey]::Escape) {
    Info ""
    Info "Exiting smartSave. Goodbye!"
    exit 0
  }
  
  switch ($key.KeyChar) {
    '3' {
      $unused = Invoke-Backup
      Info ""
      Warn "Press any key to return to menu..."
      [Console]::ReadKey() | Out-Null
      break
    }
    '5' {
      $unused = Invoke-BackupWithComment
      Info ""
      Warn "Press any key to return to menu..."
      [Console]::ReadKey() | Out-Null
      break
    }
    '7' {
      $unused = Invoke-RestoreBackupMenu
      Info ""
      Warn "Press any key to return to menu..."
      [Console]::ReadKey() | Out-Null
      break
    }
    
    default {
      Err "Invalid option. Press any key..."
      [Console]::ReadKey() | Out-Null
    }
  }
}
