'use client'

import Link from 'next/link'
import ProtectedRoute from '@/components/ProtectedRoute'

export default function AdminUsersPage() {
  return <ProtectedRoute adminOnly><main className="simple-page admin-page"><nav className="simple-header"><Link href="/admin">LookFit Admin</Link><div><Link href="/home">Home</Link><Link href="/admin">Dashboard</Link><Link href="/admin/catalog">Catalog</Link><Link href="/admin/outfits">Predefined Outfits</Link><Link className="active-nav" href="/admin/users">User Management</Link><Link href="/logout">Logout</Link></div></nav><section className="simple-content"><span className="eyebrow">USER MANAGEMENT</span><h1>Members.</h1><p>Review and manage LookFit accounts from one place.</p></section></main></ProtectedRoute>
}
