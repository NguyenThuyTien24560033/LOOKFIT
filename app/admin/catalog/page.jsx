'use client'

import Link from 'next/link'
import ProtectedRoute from '@/components/ProtectedRoute'

export default function AdminCatalogPage() {
  return <ProtectedRoute adminOnly><main className="simple-page admin-page"><nav className="simple-header"><Link href="/admin">LookFit Admin</Link><div><Link href="/home">Home</Link><Link href="/admin">Dashboard</Link><Link className="active-nav" href="/admin/catalog">Catalog</Link><Link href="/admin/outfits">Predefined Outfits</Link><Link href="/admin/users">User Management</Link><Link href="/logout">Logout</Link></div></nav><section className="simple-content"><span className="eyebrow">CATALOG</span><h1>Wardrobe catalog.</h1><p>Manage the pieces available to the LookFit styling engine.</p></section></main></ProtectedRoute>
}
