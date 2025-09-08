# Deployment and HTTPS

## Production

- Hosting: Vercel (`.vercel/project.json` present).
- HTTPS: Handled by Vercel automatically. No Nginx is required or used in production for this app.

## Local Development HTTPS (optional)

- Purpose: Enable HTTPS across `*.lvh.me` subdomains to test SSO and secure cookies (`COOKIE_SECURE=true`).
- Mechanism: Run Nginx locally as a TLS-terminating reverse proxy and forward to your local Next.js server.
- Certificates: This repo includes dev certs for `*.lvh.me` at the repo root:
  - `accounts.lvh.me+1.pem`
  - `accounts.lvh.me+1-key.pem`

### Setup Summary

1) Start the app in HTTP (adjust port as desired):

```bash
PORT=3002 bun dev
```

2) Create an Nginx server block mapping an HTTPS port to your local HTTP port. A sample config is provided at `nginx/oceanheart-local.sample.conf` using the convention:

- HTTP port `3002` → HTTPS port `3442`

3) Include the server block in your main `nginx.conf` and restart Nginx.

4) Visit `https://oceanheart.lvh.me:3442`.

See `nginx/SETUP.md` for detailed steps and troubleshooting. These local Nginx files are not committed for production and are intended only for local development.

