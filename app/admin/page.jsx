'use client'

import Link from 'next/link'
import ProtectedRoute from '@/components/ProtectedRoute'

export default function AdminPage() {
  return <ProtectedRoute adminOnly><main className="simple-page admin-page"><nav className="simple-header"><Link href="/admin">LookFit Admin</Link><div><Link className="active-nav" href="/admin">Dashboard</Link><Link href="/admin/catalog">Catalog</Link><Link href="/admin/outfits">Predefined Outfits</Link><Link href="/admin/users">User Management</Link><Link href="/logout">Logout</Link></div></nav><section className="simple-content"><span className="eyebrow">ADMIN CONSOLE</span><h1>LookFit dashboard.</h1><p>Monitor the styling catalog, curated outfits, and members.</p></section></main></ProtectedRoute>
}
