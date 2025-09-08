import { NextRequest, NextResponse } from 'next/server'
import { createSSRClient } from '../../../../packages/common-auth/src/ssrClient'
import { isAllowedReturnTo } from '../../../../packages/common-auth/src/returnTo'

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const defaultReturn = process.env.NEXT_PUBLIC_SITE_URL || 'https://accounts.oceanheart.ai'
  let target = defaultReturn
  const returnToRaw = url.searchParams.get('returnTo')
  if (returnToRaw) {
    try {
      const rt = new URL(returnToRaw)
      if (isAllowedReturnTo(rt)) target = rt.toString()
    } catch {}
  }

  const res = NextResponse.redirect(target)
  const supabase = createSSRClient(req, res)
  await supabase.auth.signOut()
  return res
}
