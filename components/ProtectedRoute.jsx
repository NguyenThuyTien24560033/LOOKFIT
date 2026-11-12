'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

// Remembers a passed check for the lifetime of the page so switching tabs renders the next
// page straight away. The check still re-runs on every mount and redirects if it fails.
const verified = { user: false, admin: false }

export default function ProtectedRoute({ children, adminOnly = false }) {
  const router = useRouter()
  const scope = adminOnly ? 'admin' : 'user'
  const [ready, setReady] = useState(() => verified[scope])

  useEffect(() => {
    const allow = () => { verified[scope] = true; setReady(true) }
    const deny = () => { verified[scope] = false; setReady(false); router.replace('/login') }

    const mockSession = sessionStorage.getItem('lookfit_mock_auth')
    if (mockSession) {
      if (adminOnly) deny()
      else allow()
      return
    }
    createClient().auth.getUser().then(({ data }) => {
      const user = data.user
      const isAdmin = user?.app_metadata?.role === 'admin'
      if (!user || (adminOnly && !isAdmin)) deny()
      else allow()
    })
  }, [adminOnly, scope, router])

  if (!ready) return <main className="route-loading" aria-busy="true">Loading LookFit...</main>
  return children
}
