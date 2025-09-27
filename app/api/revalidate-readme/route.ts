import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { getProjectBySlug } from '@/libs/portfolio'

export async function POST(request: NextRequest) {
  try {
    // Get the project slug from the request
    const body = await request.json()
    const { slug, secret } = body
    
    // Validate the revalidation secret (optional but recommended for production)
    const revalidateSecret = process.env.REVALIDATE_SECRET
    if (revalidateSecret && secret !== revalidateSecret) {
      return NextResponse.json(
        { error: 'Invalid revalidation secret' },
        { status: 401 }
      )
    }
    
    // Validate the slug
    if (!slug) {
      return NextResponse.json(
        { error: 'Missing slug parameter' },
        { status: 400 }
      )
    }
    
    // Check if the project exists
    const project = getProjectBySlug(slug)
    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      )
    }
    
    // Revalidate the specific project page
    revalidatePath(`/portfolio/${slug}`)
    
    // Also revalidate the portfolio list page
    revalidatePath('/portfolio')
    
    return NextResponse.json({
      success: true,
      message: `Revalidated README for ${project.title}`,
      revalidated: {
        slug,
        paths: [`/portfolio/${slug}`, '/portfolio']
      }
    })
  } catch (error: any) {
    console.error('Revalidation error:', error)
    
    return NextResponse.json(
      { error: 'Failed to revalidate', details: error.message },
      { status: 500 }
    )
  }
}

// GET endpoint to check revalidation status
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const slug = searchParams.get('slug')
  
  if (!slug) {
    return NextResponse.json({
      error: 'Missing slug parameter'
    }, { status: 400 })
  }
  
  const project = getProjectBySlug(slug)
  
  if (!project) {
    return NextResponse.json({
      error: 'Project not found'
    }, { status: 404 })
  }
  
  return NextResponse.json({
    project: {
      title: project.title,
      slug,
      githubRepo: project.githubRepo || null,
      githubBranch: project.githubBranch || 'main',
      hasGitHubIntegration: !!project.githubRepo
    }
  })
}