'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

export default function BackButton({ label = 'Back', fallback = '/home', className = '' }) {
  const router = useRouter()

  const goBack = () => {
    if (window.history.length > 1) router.back()
    else router.push(fallback)
  }

  return (
    <button
      type="button"
      onClick={goBack}
      className={`group mb-8 inline-flex items-center gap-2 rounded-lg border border-[#e3d7cf] bg-white/70 px-3.5 py-2 text-sm font-medium text-[#766a63] shadow-sm backdrop-blur-sm transition-colors duration-200 hover:border-[#e3c3d0] hover:bg-[#fbf0f4] hover:text-[#b5527a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b5527a]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf8f5] ${className}`}
    >
      <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" aria-hidden="true" />
      {label}
    </button>
  )
}
