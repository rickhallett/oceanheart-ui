import { NextRequest, NextResponse } from 'next/server'
import { createSSRClient } from '../../../../../packages/common-auth/src/ssrClient'
import { isAllowedReturnTo } from '../../../../../packages/common-auth/src/returnTo'

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const returnToRaw = url.searchParams.get('returnTo')
  const debug = url.searchParams.get('debug') === '1'
  const defaultReturn = process.env.NEXT_PUBLIC_SITE_URL || 'https://oceanheart.ai'
  let target = defaultReturn
  try {
    if (returnToRaw) {
      const rt = new URL(returnToRaw)
      if (isAllowedReturnTo(rt)) target = rt.toString()
    }
  } catch {}
  const debugHtml = `<!doctype html><meta charset="utf-8"/><title>Accounts Callback Debug</title>
    <div style="font-family:system-ui, -apple-system, Segoe UI, Roboto; max-width: 840px; margin:24px auto; padding:16px; background:#fef3c7; border-radius:8px; color:#111827;">
      <div style="font-weight:700; margin-bottom:6px;">Accounts Auth Callback (Debug)</div>
      <div>Target: ${target}</div>
      <div style="margin-top:10px;">Cookies will be set on this response, then you can continue.</div>
      <div style="margin-top:10px;"><a href="${target}" style="display:inline-block; padding:8px 12px; background:#111827; color:#fff; border-radius:6px; text-decoration:none;">Continue</a></div>
    </div>`
  const working = debug ? new NextResponse(debugHtml, { status: 200 }) : NextResponse.redirect(target)
  try {
    const SECURE = process.env.COOKIE_SECURE === 'true' || process.env.NODE_ENV === 'production'
    const DOMAIN = process.env.COOKIE_DOMAIN
    if (process.env.NODE_ENV !== 'production' && DOMAIN) {
      working.cookies.set({ name: 'oh_dbg', value: '1', domain: DOMAIN, secure: SECURE, sameSite: 'lax', path: '/', maxAge: 300 })
    }
  } catch {}
  const supabase = createSSRClient(req, working)
  const code = url.searchParams.get('code') || undefined
  // Exchanges the auth code for a session and sets cookies via SSR adapter
  try {
    if (code) {
      await supabase.auth.exchangeCodeForSession(code)
    }
    if (process.env.NODE_ENV !== 'production') {
      const SECURE = process.env.COOKIE_SECURE === 'true'
      const DOMAIN = process.env.COOKIE_DOMAIN
      if (DOMAIN) working.cookies.set({ name: 'oh_ex_ok', value: '1', domain: DOMAIN, secure: SECURE, sameSite: 'lax', path: '/', maxAge: 300 })
    }
  } catch (e: any) {
    if (process.env.NODE_ENV !== 'production') {
      const SECURE = process.env.COOKIE_SECURE === 'true'
      const DOMAIN = process.env.COOKIE_DOMAIN
      if (DOMAIN) working.cookies.set({ name: 'oh_ex_err', value: String(e?.message || 'exchange_failed'), domain: DOMAIN, secure: SECURE, sameSite: 'lax', path: '/', maxAge: 300 })
    }
  }
  return working
}
