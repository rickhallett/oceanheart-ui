import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { requireAuth } from '../../packages/common-auth/src/requireAuth'
import { withEntitlement } from '../../packages/common-auth/src/withEntitlement'

export async function middleware(req: NextRequest) {
  const auth = await requireAuth(req)
  if (auth instanceof NextResponse) return auth

  const { res, user } = auth
  const allowed = await withEntitlement('flowstate', user.id)
  if (!allowed) {
    return NextResponse.redirect(new URL('/no-access', req.url), { headers: res.headers })
  }
  return res
}

export const config = {
  matcher: ['/((?!_next|public|favicon.ico).*)'],
}

