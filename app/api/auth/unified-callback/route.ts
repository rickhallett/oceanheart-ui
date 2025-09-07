import { NextRequest, NextResponse } from 'next/server'

// Proxies the callback to the accounts app, preserving all query params
export async function GET(req: NextRequest) {
  const incoming = new URL(req.url)
  const target = new URL('https://accounts.oceanheart.ai/auth/callback')
  incoming.searchParams.forEach((v, k) => target.searchParams.set(k, v))
  return NextResponse.redirect(target, { status: 307 })
}

