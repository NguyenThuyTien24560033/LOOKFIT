'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LogoutPage() {
  const router = useRouter()
  useEffect(() => {
    sessionStorage.removeItem('lookfit_mock_auth')
    createClient().auth.signOut().finally(() => router.replace('/'))
  }, [router])
  return <main className="route-loading" aria-busy="true">Signing out...</main>
}
