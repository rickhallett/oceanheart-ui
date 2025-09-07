# Local Development for Subdomain SSO

Run separate Next.js apps on lvh.me subdomains without editing /etc/hosts.

- Ports and hosts
  - accounts: http://accounts.lvh.me:3000
  - flowstate: http://flowstate.lvh.me:3001
  - main: http://oceanheart.lvh.me:3002

- Env per repo (.env.local)
  - NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY
  - COOKIE_DOMAIN=.lvh.me
  - NEXT_PUBLIC_SITE_URL=http://accounts.lvh.me:3000
  - RETURNTO_ALLOW_HOSTS=oceanheart.lvh.me:3002,flowstate.lvh.me:3001
  - (accounts) RECAPTCHA_SECRET_KEY if used
  - (server-only where needed) SUPABASE_SERVICE_ROLE_KEY

- Supabase settings
  - Redirect URLs: add accounts callback and main unified-callback for lvh.me ports.
  - Cookie domain: set to .oceanheart.ai for prod; local uses SSR adapter domain `.lvh.me`.

- Flow
  1) Visit flowstate.lvh.me:3001 → middleware redirects to accounts.lvh.me:3000/signin.
  2) Sign in (accounts) → callback exchanges session → redirect back to flowstate.
  3) Entitlement gate allows/denies.
  4) Logout on accounts clears session for all subdomains.

