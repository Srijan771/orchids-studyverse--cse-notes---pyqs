import Razorpay from "razorpay"
import { supabase } from "./supabase"

export const getRazorpayInstance = async () => {
  const { data: settings } = await supabase
    .from('admin_settings')
    .select('key, value')
    .in('key', ['razorpay_key_id', 'razorpay_key_secret', 'razorpay_enabled'])
  
  const config = settings?.reduce((acc: any, curr) => {
    acc[curr.key] = curr.value
    return acc
  }, {})

  if (!config?.razorpay_enabled || config.razorpay_enabled === 'false') {
    return null
  }

  if (!config.razorpay_key_id || !config.razorpay_key_secret) {
    return null
  }

  return new Razorpay({
    key_id: config.razorpay_key_id,
    key_secret: config.razorpay_key_secret,
  })
}
