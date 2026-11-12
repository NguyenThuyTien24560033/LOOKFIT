'use client'

import { useEffect, useState } from 'react'

function getInitials(name) {
  return name.split(/\s+/).filter(Boolean).map(part => part[0]).join('').slice(0, 2).toUpperCase()
}

export default function UserMenu() {
  const [showDropdown, setShowDropdown] = useState(false)
  const [account, setAccount] = useState({ name: '', initials: '' })

  useEffect(() => {
    try {
      const stored = JSON.parse(sessionStorage.getItem('lookfit_mock_auth') || 'null')
      const name = String(stored?.fullName || stored?.name || '').trim()
      setAccount({ name, initials: getInitials(name) })
    } catch {
      setAccount({ name: '', initials: '' })
    }
  }, [])

  function handleLogout() {
    sessionStorage.removeItem('lookfit_mock_auth')
    window.location.assign('/logout')
  }

  return <div className="relative"><button type="button" aria-label={`Open account menu for ${account.name}`} aria-expanded={showDropdown} onClick={() => setShowDropdown(!showDropdown)} className="flex items-center gap-2 rounded-xl border border-transparent px-2 py-1.5 transition hover:border-[#ead5de] hover:bg-[#fff6f6] focus:outline-none focus:ring-2 focus:ring-[#c9796e]/25"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#ead5de] text-xs font-semibold text-[#9b5c70]">{account.initials}</span><span className="max-w-[150px] truncate text-[11px] font-semibold text-[#403733]">{account.name}</span></button>{showDropdown && <div role="menu" className="absolute right-0 top-[calc(100%+8px)] z-50 min-w-[112px] rounded-xl border border-[#e9e0d9] bg-[#fffdfb] p-1 shadow-[0_14px_30px_rgba(74,48,42,0.14)]"><button role="menuitem" type="button" onClick={handleLogout} className="block w-full rounded-lg px-3 py-2.5 text-left text-xs text-[#665a53] transition hover:bg-[#f5eee9] hover:text-[#b5527a]">Log out</button></div>}</div>
}
