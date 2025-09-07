import { NextRequest, NextResponse } from 'next/server'

// Redirects to central accounts sign-in, preserving an optional returnTo param
export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const accountsUrl = new URL('https://accounts.oceanheart.ai/signin')
  const returnTo = url.searchParams.get('returnTo') || `${url.origin}/`
  accountsUrl.searchParams.set('returnTo', returnTo)
  return NextResponse.redirect(accountsUrl)
}

