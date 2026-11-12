'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ArrowLeft, Check, Heart } from 'lucide-react'
import ProtectedRoute from '@/components/ProtectedRoute'
import UserMenu from '@/components/UserMenu'
import BackButton from '@/components/BackButton'
import { saveLook } from '@/lib/saved-looks'

const outfits = [
  { name: 'The Easy Essential', score: 96, detail: 'Linen shirt · Straight denim · Soft loafers', image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85' },
  { name: 'Warm Weekend Edit', score: 93, detail: 'Cotton tee · Wide-leg trouser · Leather bag', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=85' },
  { name: 'Quietly Polished', score: 91, detail: 'Silk blouse · Tailored trouser · Gold watch', image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=85' },
  { name: 'Campus to Coffee', score: 88, detail: 'Relaxed knit · Denim skirt · Everyday sneakers', image: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=900&q=85' },
]

function ResultsPage() {
  const router = useRouter()
  const [savedNames, setSavedNames] = useState([])
  const saveOutfit = outfit => {
    saveLook(outfit)
    setSavedNames(current => [...current, outfit.name])
    window.setTimeout(() => router.push('/history'), 180)
  }

  return <main className="min-h-screen bg-[#faf8f5] text-[#2b2623]"><header className="sticky top-0 z-20 border-b border-[#e9e0d9] bg-[#fffdfb]/95 backdrop-blur"><div className="mx-auto flex h-[76px] max-w-[1180px] items-center justify-between px-5 sm:px-8"><Link href="/home" aria-label="LookFit home"><img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/lookfit-logo-new-SgG0KVJPTSg9JSHg2oL4vzSMpzFO80.png" alt="LookFit" className="h-10 w-[132px] object-cover object-center" /></Link><nav className="hidden items-center gap-7 text-xs text-[#766a63] md:flex"><Link href="/home">Home</Link><Link href="/profile">Profile</Link><Link className="font-medium text-[#b5527a]" href="/recommendation">Recommendation</Link><Link href="/history">History</Link></nav><UserMenu /></div></header><div className="mx-auto max-w-[1180px] px-5 py-10 sm:px-8 lg:py-14"><BackButton /><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><div className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#b5527a]">Curated for you</div><h1 className="font-serif text-5xl tracking-[-2px] text-[#302824]">Your outfit <em className="text-[#b5527a]">matches.</em></h1><p className="mt-3 text-sm text-[#887b73]">Four looks selected for your occasion, style and lifestyle.</p></div><span className="rounded-full bg-[#ead5de] px-3 py-2 text-[11px] font-medium text-[#8e5267]">4 recommendations</span></div><div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{outfits.map(outfit => <article key={outfit.name} className="group overflow-hidden rounded-2xl border border-[#e9e0d9] bg-[#fffdfb] transition hover:-translate-y-1 hover:shadow-[0_12px_26px_rgba(74,48,42,0.1)]"><div className="relative aspect-[4/5] overflow-hidden bg-[#eaded5]"><img src={outfit.image} alt={outfit.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /><div className="absolute right-3 top-3 flex items-center gap-2"><span className="flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-[#9b5c70]"><Check size={12} /> {outfit.score}%</span><button type="button" aria-label={`Save ${outfit.name}`} onClick={() => saveOutfit(outfit)} className={`grid h-8 w-8 place-items-center rounded-full bg-white/90 shadow-sm transition hover:scale-105 hover:bg-white ${savedNames.includes(outfit.name) ? 'text-[#b5527a]' : 'text-[#9b5c70]'}`}><Heart size={15} strokeWidth={1.8} fill={savedNames.includes(outfit.name) ? 'currentColor' : 'none'} /></button></div></div><div className="p-4"><h2 className="font-serif text-xl text-[#403733]">{outfit.name}</h2><p className="mt-2 text-[11px] leading-5 text-[#9a8d84]">{outfit.detail}</p></div></article>)}</div></div></main>
}

export default function RecommendationResults() { return <ProtectedRoute><ResultsPage /></ProtectedRoute> }
