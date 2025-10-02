# PowerShell script для виправлення шляхів у збірці для root хостингу
# Замінює всі /eurogranite-website/ шляхи на / для розміщення в root

Write-Host "🔧 Fixing paths for root hosting..." -ForegroundColor Green
Write-Host "Converting /eurogranite-website/ → /" -ForegroundColor Yellow

$buildPath = "eurogranite-website-optimized"

# Знаходимо всі HTML файли
$htmlFiles = Get-ChildItem -Path $buildPath -Recurse -Filter "*.html"

$totalFiles = $htmlFiles.Count
$processedFiles = 0

Write-Host "📁 Found $totalFiles HTML files to process" -ForegroundColor Cyan

foreach ($file in $htmlFiles) {
    $processedFiles++
    $relativePath = $file.FullName.Replace((Get-Location).Path + "\", "")

    Write-Progress -Activity "Processing files" -Status "File $processedFiles of $totalFiles" -PercentComplete (($processedFiles / $totalFiles) * 100)

    # Читаємо вміст файлу
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8

    # Замінюємо шляхи
    $originalContent = $content

    # 1. Favicon та статичні ресурси
    $content = $content -replace 'href="/eurogranite-website/', 'href="/'
    $content = $content -replace 'src="/eurogranite-website/', 'src="/'

    # 2. Canonical URLs
    $content = $content -replace 'https://eg\.yalivets\.top/eurogranite-website/', 'https://eg.yalivets.top/'

    # 3. Open Graph URLs
    $content = $content -replace 'content="https://eg\.yalivets\.top/eurogranite-website/', 'content="https://eg.yalivets.top/'

    # 4. Twitter URLs
    $content = $content -replace 'twitter:url.*?eurogranite-website/', 'twitter:url" content="https://eg.yalivets.top/'

    # 5. Hreflang URLs
    $content = $content -replace 'hreflang="[^"]*" href="https://eg\.yalivets\.top/eurogranite-website/', 'hreflang="$1" href="https://eg.yalivets.top/'

    # Перевіряємо чи були зміни
    if ($content -ne $originalContent) {
        # Записуємо змінений вміст
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
        Write-Host "✅ Fixed: $relativePath" -ForegroundColor Green
    } else {
        Write-Host "⏭️  Skipped: $relativePath (no changes needed)" -ForegroundColor Gray
    }
}

Write-Progress -Activity "Processing files" -Completed

Write-Host "`n🎉 Path fixing completed!" -ForegroundColor Green
Write-Host "📊 Processed $processedFiles files" -ForegroundColor Cyan
Write-Host "🚀 Build is now ready for root hosting at https://eg.yalivets.top/" -ForegroundColor Yellow

# Перевіряємо результат
Write-Host "`n🔍 Verification - checking for remaining /eurogranite-website/ paths..." -ForegroundColor Cyan
$remainingPaths = Select-String -Path "$buildPath\*.html" -Pattern "/eurogranite-website/" -Recurse

if ($remainingPaths) {
    Write-Host "⚠️  Found $($remainingPaths.Count) remaining paths that need manual review:" -ForegroundColor Red
    $remainingPaths | ForEach-Object { Write-Host "   $($_.Filename):$($_.LineNumber)" -ForegroundColor Red }
} else {
    Write-Host "✅ No remaining /eurogranite-website/ paths found!" -ForegroundColor Green
}

Write-Host "`n📋 Next steps:" -ForegroundColor Magenta
Write-Host "1. Upload contents of '$buildPath' folder to your Hostinger root directory" -ForegroundColor White
Write-Host "2. Your site will be available at: https://eg.yalivets.top/" -ForegroundColor White
Write-Host "3. Test all language versions: /ua/, /en/, /de/, /pl/" -ForegroundColor White