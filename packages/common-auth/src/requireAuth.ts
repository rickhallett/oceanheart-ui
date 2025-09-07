import { NextRequest, NextResponse } from 'next/server'
import { createSSRClient } from './ssrClient'

export function buildSignInURL(returnTo: URL) {
  const u = new URL('https://accounts.oceanheart.ai/signin')
  u.searchParams.set('returnTo', returnTo.toString())
  return u
}

export async function requireAuth(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createSSRClient(req, res)
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    const signInUrl = buildSignInURL(new URL(req.url))
    return NextResponse.redirect(signInUrl, { headers: res.headers })
  }
  return { res, user }
}

