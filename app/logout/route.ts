import { NextRequest, NextResponse } from 'next/server'
import { createSSRClient } from '../../packages/common-auth/src/ssrClient'
import { isAllowedReturnTo } from '../../packages/common-auth/src/returnTo'

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const def = process.env.NEXT_PUBLIC_SITE_URL || `${url.origin}/`
  let target = def
  const raw = url.searchParams.get('returnTo')
  if (raw) {
    try {
      const rt = new URL(raw)
      if (isAllowedReturnTo(rt)) target = rt.toString()
    } catch {}
  }
  const res = NextResponse.redirect(target)
  const supabase = createSSRClient(req, res)
  await supabase.auth.signOut()
  return res
}

