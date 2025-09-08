Local HTTPS (lvh.me) with Nginx

Goal
- Run your local Accounts and Flowstate on HTTPS lvh.me subdomains so:
  - Supabase accepts your redirect URLs in emails (HTTPS, non-localhost)
  - Cookies behave like prod across subdomains (schemeful, same-site)

Prereqs
- macOS examples (adapt for Linux/Windows as needed)
- mkcert: `brew install mkcert nss && mkcert -install`
- Nginx: `brew install nginx`

1) Generate certificates
```bash
cd ~/certs   # or any folder you like
mkcert accounts.lvh.me flowstate.lvh.me
# Outputs e.g. accounts.lvh.me+1.pem and accounts.lvh.me+1-key.pem
```

2) Add Nginx virtual hosts
- Copy dev/nginx/oceanheart-local.conf to your Nginx servers folder.
  - Homebrew default: /opt/homebrew/etc/nginx/servers (Apple Silicon)
  - or: /usr/local/etc/nginx/servers (Intel)
- Edit the file and set absolute paths to your mkcert files.

3) (Optional) WebSocket upgrade mapping
- The provided config unconditionally sets `Connection: upgrade`. Most setups work fine.
- If you prefer a conditional upgrade, add this inside your main nginx.conf http {} block:
```
map $http_upgrade $connection_upgrade {
  default upgrade;
  ''      close;
}
```
- Then replace `proxy_set_header Connection "upgrade";` with `proxy_set_header Connection $connection_upgrade;` in each server block.

4) Test and reload Nginx
```bash
sudo nginx -t
brew services restart nginx   # or: sudo nginx -s reload
```

5) Update local envs
- Accounts (oceanheart-ui/.env.local):
```
NEXT_PUBLIC_SITE_URL=https://accounts.lvh.me:3443
COOKIE_DOMAIN=.lvh.me
COOKIE_SECURE=true
```
- Flowstate (flowstate/.env.local):
```
NEXT_PUBLIC_LOGIN_URL=https://accounts.lvh.me:3443/signin
COOKIE_DOMAIN=.lvh.me
COOKIE_SECURE=true
```
- Restart both dev servers to pick up env changes.

6) Supabase Auth settings
- Authentication → URL Configuration → Additional Redirect URLs:
  - Add: https://accounts.lvh.me:3443/auth/callback
  - Keep: https://accounts.oceanheart.ai/auth/callback (for prod)

7) Validate
- Open https://accounts.lvh.me:3443 and https://flowstate.lvh.me:3442 in your browser.
- On the sign-in page dev banner, verify:
  - base/accountsBase = https://accounts.lvh.me:3443
  - callback = https://accounts.lvh.me:3443/auth/callback?returnTo=https://flowstate.lvh.me:3442/
- Trigger a magic link; the email’s redirect_to should match the HTTPS lvh.me callback.

Troubleshooting
- Email still shows accounts.oceanheart.ai in redirect_to:
  - Double-check Supabase Additional Redirect URLs includes the exact https lvh.me callback with correct port.
  - Confirm NEXT_PUBLIC_SITE_URL is https://accounts.lvh.me:3443 and the dev banner shows that.
  - Restart the dev server after env changes.
- Browser shows cert warning:
  - Re-run `mkcert -install` to trust the local CA.
  - Ensure Nginx points to the mkcert-generated cert and key.

