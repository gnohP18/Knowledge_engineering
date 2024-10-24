# Kiểm tra xem pnpm có được cài đặt hay không
if (-not (Get-Command pnpm -ErrorAction SilentlyContinue)) {
    Write-Host "pnpm not found. Please install pnpm first."
    exit 1
}

# Tạo biến để chứa danh sách các tệp đã thay đổi (staged và unstaged)
$files = git diff --name-only | Where-Object { $_ -match '\.(js|ts|vue|json|css|scss|md)$' }
$stagedFiles = git diff --cached --name-only | Where-Object { $_ -match '\.(js|ts|vue|json|css|scss|md)$' }

# Kết hợp cả staged và unstaged files
$allFiles = $files + $stagedFiles

if ($allFiles) {
    Write-Host "Formatting the following files:"
    $allFiles | ForEach-Object { Write-Host prettier --write $_ }
    # prettier --write $allFiles
} else {
    Write-Host "No files to format."
}
