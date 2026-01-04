import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const getAdminSettings = async () => {
  const { data, error } = await supabase
    .from('admin_settings')
    .select('key, value')
  
  if (error) return {}
  
  return data.reduce((acc: any, curr) => {
    acc[curr.key] = curr.value
    return acc
  }, {})
}
