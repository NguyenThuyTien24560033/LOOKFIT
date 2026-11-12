'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import UserMenu from '@/components/UserMenu'

const navItems = [
  { href: '/home', label: 'Home' },
  { href: '/profile', label: 'Profile' },
  { href: '/recommendation', label: 'Recommendation' },
  { href: '/history', label: 'History' },
]

export default function AppHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-30 border-b border-[#e9e0d9] bg-[#fffdfb]/95 backdrop-blur">
      <div className="mx-auto flex h-[76px] max-w-[1180px] items-center justify-between gap-6 px-5 sm:px-8">
        <Link href="/home" aria-label="LookFit home" className="shrink-0">
          <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/lookfit-logo-new-SgG0KVJPTSg9JSHg2oL4vzSMpzFO80.png" alt="LookFit" className="h-10 w-[132px] object-cover object-center" />
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-7 text-xs text-[#766a63] md:flex">
          {navItems.map(item => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link key={item.href} href={item.href} aria-current={active ? 'page' : undefined} className={active ? 'font-medium text-[#b5527a]' : 'hover:text-[#2b2623]'}>
                {item.label}
              </Link>
            )
          })}
        </nav>
        <UserMenu />
      </div>
    </header>
  )
}
