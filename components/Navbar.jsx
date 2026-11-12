'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  ['Home', '/'],
  ['Discover feed', '#feed'],
  ['Reviews', '#reviews'],
  ['Profile', '/profile'],
  ['Recommendation', '/recommendation'],
  ['History', '/history'],
]

function isActivePath(pathname, href) {
  return href.startsWith('/') && (pathname === href || pathname.startsWith(`${href}/`))
}

export default function Navbar({ internal = false }) {
  const pathname = usePathname() || '/'
  const visibleLinks = internal ? links : links.filter(([label]) => ['Home', 'Discover feed', 'Reviews', 'History'].includes(label))

  return <nav className="nav-links shared-nav" aria-label="Primary navigation">{visibleLinks.map(([label, href]) => { const active = isActivePath(pathname, href); return <Link key={label} href={href} aria-current={active ? 'page' : undefined} data-active={active ? 'true' : 'false'} className={`relative whitespace-nowrap transition-colors hover:text-[#b5527a] ${active ? 'border-b-2 border-[#A25F69] pb-1 font-medium text-[#A25F69]' : 'text-[#766a63]'}`}>{label}</Link> })}</nav>
}
