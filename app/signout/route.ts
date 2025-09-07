import { NextRequest, NextResponse } from 'next/server'

// Redirects to central accounts logout to clear domain-scoped cookies
export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const accountsLogout = new URL('https://accounts.oceanheart.ai/logout')
  accountsLogout.searchParams.set('returnTo', `${url.origin}/`)
  return NextResponse.redirect(accountsLogout)
}

