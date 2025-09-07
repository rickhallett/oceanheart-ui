import { NextRequest, NextResponse } from 'next/server'

const VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({})) as { token?: string }
    const token = body?.token
    if (!token) return NextResponse.json({ ok: false, error: 'missing_token' }, { status: 400 })

    const secret = process.env.RECAPTCHA_SECRET_KEY
    if (!secret) return NextResponse.json({ ok: false, error: 'missing_server_secret' }, { status: 500 })

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    const form = new URLSearchParams()
    form.set('secret', secret)
    form.set('response', token)
    if (ip) form.set('remoteip', ip)

    const resp = await fetch(VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: form,
      // Next: { revalidate: 0 } // not necessary here
    })
    const data = await resp.json()
    const ok = !!data?.success
    return NextResponse.json({ ok, score: data?.score, action: data?.action, errors: data?.['error-codes'] })
  } catch (e) {
    return NextResponse.json({ ok: false, error: 'verification_error' }, { status: 500 })
  }
}

