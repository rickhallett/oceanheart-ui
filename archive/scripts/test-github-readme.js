#!/usr/bin/env node

/**
 * Test script for GitHub README fetching functionality
 * Run with: node scripts/test-github-readme.js
 */

const { getGitHubReadme } = require('../libs/github.ts')
const { getProjectReadmeContent } = require('../libs/markdown.ts')
const { getAllProjects } = require('../libs/portfolio.ts')

async function testGitHubFetching() {
  console.log('🧪 Testing GitHub README Fetching\n')
  console.log('=' .repeat(50))
  
  // Get all projects with GitHub repos
  const projects = getAllProjects().filter(p => p.githubRepo)
  
  console.log(`Found ${projects.length} projects with GitHub repos:\n`)
  
  for (const project of projects) {
    console.log(`\n📦 Testing: ${project.title}`)
    console.log(`   Repo: ${project.githubRepo}`)
    console.log(`   Branch: ${project.githubBranch || 'main'}`)
    
    try {
      // Test direct GitHub fetching
      console.log('   Testing direct GitHub fetch...')
      const githubResult = await getGitHubReadme(
        project.githubRepo,
        project.githubBranch
      )
      
      if (githubResult.exists) {
        console.log(`   ✅ GitHub fetch successful (${githubResult.content.length} chars)`)
      } else {
        console.log(`   ❌ GitHub fetch failed: ${githubResult.error}`)
      }
      
      // Test integrated markdown processing
      console.log('   Testing integrated processing...')
      const readmeContent = await getProjectReadmeContent(project.slug)
      
      if (readmeContent.exists) {
        console.log(`   ✅ Markdown processing successful`)
      } else {
        console.log(`   ⚠️  Fallback to local file used`)
      }
      
    } catch (error) {
      console.error(`   ❌ Error: ${error.message}`)
    }
  }
  
  console.log('\n' + '=' .repeat(50))
  console.log('✨ Test completed!')
}

// Run tests
testGitHubFetching().catch(console.error)