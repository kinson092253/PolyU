# 项目智能压缩脚本
# 使用方法: .\compress_project.ps1

Write-Host "🗜️ 开始压缩项目..." -ForegroundColor Green
Write-Host ""

# 项目路径
$projectPath = "Capstone_Project"
$zipFile = "Capstone_Project_$(Get-Date -Format 'yyyyMMdd_HHmmss').zip"

# 要排除的文件夹和文件
$excludePaths = @(
    "frontend\node_modules",
    "frontend\build",
    "backend\__pycache__",
    "backend\venv",
    "backend\env",
    ".git",
    ".vscode",
    ".idea"
)

Write-Host "📋 将排除以下文件夹:" -ForegroundColor Yellow
$excludePaths | ForEach-Object { Write-Host "  - $_" }
Write-Host ""

# 创建临时文件列表
$tempDir = New-TemporaryFile | ForEach-Object { Remove-Item $_; New-Item -ItemType Directory -Path $_ }

try {
    # 获取所有文件（排除特定路径）
    Write-Host "📦 收集文件中..." -ForegroundColor Cyan
    
    $allFiles = Get-ChildItem -Path $projectPath -Recurse -File | Where-Object {
        $filePath = $_.FullName
        $shouldExclude = $false
        
        foreach ($exclude in $excludePaths) {
            if ($filePath -like "*\$exclude\*") {
                $shouldExclude = $true
                break
            }
        }
        
        -not $shouldExclude
    }
    
    Write-Host "✅ 找到 $($allFiles.Count) 个文件" -ForegroundColor Green
    
    # 压缩
    Write-Host "🗜️ 压缩中..." -ForegroundColor Cyan
    
    Compress-Archive -Path $projectPath -DestinationPath $zipFile -Force
    
    $zipSize = (Get-Item $zipFile).Length / 1MB
    Write-Host ""
    Write-Host "✅ 压缩完成！" -ForegroundColor Green
    Write-Host "📦 文件名: $zipFile" -ForegroundColor White
    Write-Host "📏 大小: $([math]::Round($zipSize, 2)) MB" -ForegroundColor White
    Write-Host ""
    
    # 显示对比
    if (Test-Path "$projectPath\frontend\node_modules") {
        $nodeModulesSize = (Get-ChildItem "$projectPath\frontend\node_modules" -Recurse | 
            Measure-Object -Property Length -Sum).Sum / 1MB
        Write-Host "💡 提示: node_modules 占用 $([math]::Round($nodeModulesSize, 2)) MB" -ForegroundColor Yellow
        Write-Host "   删除后可节省大量空间！" -ForegroundColor Yellow
    }
    
} catch {
    Write-Host "❌ 压缩失败: $_" -ForegroundColor Red
} finally {
    # 清理临时文件
    Remove-Item -Recurse -Force $tempDir -ErrorAction SilentlyContinue
}

Write-Host ""
Write-Host "按任意键退出..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
