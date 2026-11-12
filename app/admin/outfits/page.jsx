'use client'

import Link from 'next/link'
import ProtectedRoute from '@/components/ProtectedRoute'

export default function AdminOutfitsPage() {
  return <ProtectedRoute adminOnly><main className="simple-page admin-page"><nav className="simple-header"><Link href="/admin">LookFit Admin</Link><div><Link href="/home">Home</Link><Link href="/admin">Dashboard</Link><Link href="/admin/catalog">Catalog</Link><Link className="active-nav" href="/admin/outfits">Predefined Outfits</Link><Link href="/admin/users">User Management</Link><Link href="/logout">Logout</Link></div></nav><section className="simple-content"><span className="eyebrow">PREDEFINED OUTFITS</span><h1>Curated looks.</h1><p>Build and publish the outfit sets used by recommendations.</p></section></main></ProtectedRoute>
}
