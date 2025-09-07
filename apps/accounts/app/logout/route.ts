import { NextRequest, NextResponse } from 'next/server'
import { createSSRClient } from '../../../../packages/common-auth/src/ssrClient'

export async function GET(req: NextRequest) {
  const res = NextResponse.redirect(new URL('/', req.url))
  const supabase = createSSRClient(req, res)
  await supabase.auth.signOut()
  return res
}

