import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function withEntitlement(appSlug: string, userId: string) {
  const { data, error } = await supabaseAdmin
    .from('user_entitlements')
    .select('expires_at')
    .eq('user_id', userId)
    .eq('app_slug', appSlug)
    .single()

  if (error || !data) return false
  if (!data.expires_at) return true
  return new Date(data.expires_at).getTime() > Date.now()
}

