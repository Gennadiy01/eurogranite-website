const fs = require('fs')
const path = require('path')

const buildDir = path.join(__dirname, '../build/static/js')
const maxBundleSize = 500 * 1024 // 500KB in bytes

function getFileSize(filePath) {
  const stats = fs.statSync(filePath)
  return stats.size
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

try {
  console.log('\n📦 Bundle Size Analysis')
  console.log('========================')

  if (!fs.existsSync(buildDir)) {
    console.error('❌ Build directory not found. Please run build first.')
    process.exit(1)
  }

  const jsFiles = fs.readdirSync(buildDir).filter(file => file.endsWith('.js'))
  let totalSize = 0
  let mainBundleSize = 0

  console.log('\n📊 JavaScript Bundle Files:')
  console.log('----------------------------')

  jsFiles.forEach(file => {
    const filePath = path.join(buildDir, file)
    const size = getFileSize(filePath)
    totalSize += size

    if (file.includes('main.')) {
      mainBundleSize = size
    }

    const sizeFormatted = formatBytes(size)
    const isLarge = size > maxBundleSize
    const indicator = isLarge ? '⚠️ ' : '✅ '

    console.log(`${indicator}${file}: ${sizeFormatted}`)
  })

  console.log('\n📈 Summary:')
  console.log('------------')
  console.log(`Total JS Bundle Size: ${formatBytes(totalSize)}`)
  console.log(`Main Bundle Size: ${formatBytes(mainBundleSize)}`)
  console.log(`Target Size: ${formatBytes(maxBundleSize)}`)

  if (mainBundleSize > maxBundleSize) {
    console.log(`\n❌ Main bundle exceeds target size by ${formatBytes(mainBundleSize - maxBundleSize)}`)
    console.log('\n💡 Recommendations:')
    console.log('   • Check if lazy loading is working correctly')
    console.log('   • Analyze large dependencies with: npm run analyze')
    console.log('   • Consider code splitting for heavy components')

    // Exit with error code for CI/CD
    process.exit(1)
  } else {
    console.log('\n✅ Bundle size is within target limits')
    console.log(`   Remaining budget: ${formatBytes(maxBundleSize - mainBundleSize)}`)
  }

  // Check for code splitting effectiveness
  const chunkFiles = jsFiles.filter(file => file.includes('chunk') || file.includes('.'))
  if (chunkFiles.length > 1) {
    console.log(`\n🎯 Code Splitting: ${chunkFiles.length} chunks detected ✅`)
  } else {
    console.log('\n⚠️  Code Splitting: No chunks detected - consider implementing lazy loading')
  }

} catch (error) {
  console.error('❌ Error analyzing bundle size:', error.message)
  process.exit(1)
}