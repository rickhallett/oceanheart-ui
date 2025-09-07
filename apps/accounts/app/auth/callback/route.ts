import { NextRequest, NextResponse } from 'next/server'
import { createSSRClient } from '../../../../../packages/common-auth/src/ssrClient'
import { isAllowedReturnTo } from '../../../../../packages/common-auth/src/returnTo'

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const returnToRaw = url.searchParams.get('returnTo')
  const defaultReturn = process.env.NEXT_PUBLIC_SITE_URL || 'https://oceanheart.ai'
  let target = defaultReturn
  try {
    if (returnToRaw) {
      const rt = new URL(returnToRaw)
      if (isAllowedReturnTo(rt)) target = rt.toString()
    }
  } catch {}

  const res = NextResponse.redirect(target)
  const supabase = createSSRClient(req, res)
  // Exchanges the auth code for a session and sets cookies via SSR adapter
  await supabase.auth.exchangeCodeForSession()
  return res
}

