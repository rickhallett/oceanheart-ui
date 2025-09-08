import { NextRequest, NextResponse } from 'next/server'

// Redirects to integrated callback in this app, preserving params
export async function GET(req: NextRequest) {
  const incoming = new URL(req.url)
  const target = new URL('/auth/callback', incoming.origin)
  incoming.searchParams.forEach((v, k) => target.searchParams.set(k, v))
  return NextResponse.redirect(target, { status: 307 })
}
