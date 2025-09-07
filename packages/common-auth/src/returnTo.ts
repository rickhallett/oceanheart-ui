const ALLOW_HOSTS = (process.env.RETURNTO_ALLOW_HOSTS || '')
  .split(',')
  .map(h => h.trim())
  .filter(Boolean)

export function isAllowedReturnTo(u: URL) {
  const host = u.host.toLowerCase()
  if (host.endsWith('.oceanheart.ai')) return true
  return ALLOW_HOSTS.includes(host)
}

