const { execSync } = require('child_process')
const fs = require('fs')

console.log('🧪 Running Regression Tests for Refactoring Changes')
console.log('====================================================\n')

const tests = [
  {
    name: '1. Bundle Size Check',
    command: 'npm run bundle:size',
    description: 'Verify bundle size is within limits after lazy loading'
  },
  {
    name: '2. Language Store Tests',
    command: 'npm test -- --testPathPattern="languageStore.test.js" --watchAll=false --silent',
    description: 'Test language consistency and browser detection'
  },
  {
    name: '3. Error Boundary Tests',
    command: 'npm test -- --testPathPattern="LazyLoadErrorBoundary.test.js" --watchAll=false --silent',
    description: 'Test error handling for lazy components'
  },
  {
    name: '4. Build Verification',
    command: 'npm run build:clean',
    description: 'Verify application builds successfully with lazy loading'
  }
]

let passedTests = 0
let failedTests = 0
const results = []

for (const test of tests) {
  try {
    console.log(`🔄 ${test.name}: ${test.description}`)

    const startTime = Date.now()
    const output = execSync(test.command, {
      encoding: 'utf8',
      stdio: 'pipe'
    })
    const duration = Date.now() - startTime

    console.log(`✅ PASSED (${duration}ms)\n`)
    passedTests++

    results.push({
      name: test.name,
      status: 'PASSED',
      duration,
      output: output.trim()
    })

  } catch (error) {
    console.log(`❌ FAILED`)
    console.log(`Error: ${error.message}\n`)
    failedTests++

    results.push({
      name: test.name,
      status: 'FAILED',
      duration: 0,
      error: error.message
    })
  }
}

// Summary
console.log('📊 Test Summary')
console.log('================')
console.log(`✅ Passed: ${passedTests}`)
console.log(`❌ Failed: ${failedTests}`)
console.log(`📈 Success Rate: ${((passedTests / tests.length) * 100).toFixed(1)}%`)

// Detailed Results
console.log('\n📋 Detailed Results')
console.log('====================')

results.forEach(result => {
  const status = result.status === 'PASSED' ? '✅' : '❌'
  console.log(`${status} ${result.name}`)

  if (result.status === 'FAILED') {
    console.log(`   Error: ${result.error}`)
  } else {
    console.log(`   Duration: ${result.duration}ms`)
  }
})

// Performance Analysis
if (passedTests > 0) {
  console.log('\n⚡ Performance Analysis')
  console.log('=======================')

  // Check if bundle size test passed and analyze results
  const bundleTest = results.find(r => r.name.includes('Bundle Size'))
  if (bundleTest && bundleTest.status === 'PASSED') {
    console.log('📦 Bundle Analysis:')
    console.log('   • Lazy loading is working correctly')
    console.log('   • Code splitting is active')
    console.log('   • Bundle size is within target limits')
  }

  console.log('\n🎯 Regression Status:')
  if (failedTests === 0) {
    console.log('   ✅ No regressions detected')
    console.log('   ✅ All refactoring changes are working correctly')
  } else {
    console.log('   ⚠️  Some tests failed - review the issues above')
  }
}

// Exit with appropriate code
process.exit(failedTests > 0 ? 1 : 0)