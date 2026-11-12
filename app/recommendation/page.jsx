'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ArrowRight, ChevronDown } from 'lucide-react'
import ProtectedRoute from '@/components/ProtectedRoute'
import UserMenu from '@/components/UserMenu'
import BackButton from '@/components/BackButton'

const filters = [
  ['Occasion', ['casual', 'work', 'date night', 'weekend']],
  ['Style', ['basic', 'minimal', 'romantic', 'streetwear']],
  ['Season', ['summer', 'spring', 'autumn', 'winter']],
  ['Weather', ['warm', 'mild', 'cool', 'cold']],
  ['Lifestyle', ['student', 'professional', 'creative', 'traveler']],
]

const FILTERS_KEY = 'lookfit_recommendation_filters'
const defaultValues = { Occasion: 'casual', Style: 'basic', Season: 'summer', Weather: 'warm', Lifestyle: 'student' }

function readStoredValues() {
  try {
    const stored = JSON.parse(sessionStorage.getItem(FILTERS_KEY) || '{}')
    return Object.fromEntries(filters.map(([label, options]) => [label, options.includes(stored[label]) ? stored[label] : defaultValues[label]]))
  } catch {
    return defaultValues
  }
}

function RecommendationFilters() {
  const router = useRouter()
  const [values, setValues] = useState(readStoredValues)

  useEffect(() => {
    try { sessionStorage.setItem(FILTERS_KEY, JSON.stringify(values)) } catch {}
  }, [values])

  const update = (key, value) => setValues(current => ({ ...current, [key]: value }))
  const submit = event => {
    event.preventDefault()
    const query = new URLSearchParams(Object.entries(values)).toString()
    router.push(`/recommendation/result?${query}`)
  }

  return <main className="min-h-screen bg-[#faf8f5] text-[#2b2623]"><header className="sticky top-0 z-20 border-b border-[#e9e0d9] bg-[#fffdfb]/95 backdrop-blur"><div className="mx-auto flex h-[76px] max-w-[1180px] items-center justify-between px-5 sm:px-8"><Link href="/home" aria-label="LookFit home"><img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/lookfit-logo-new-SgG0KVJPTSg9JSHg2oL4vzSMpzFO80.png" alt="LookFit" className="h-10 w-[132px] object-cover object-center" /></Link><nav className="hidden items-center gap-7 text-xs text-[#766a63] md:flex"><Link href="/home">Home</Link><Link href="/profile">Profile</Link><Link className="font-medium text-[#b5527a]" href="/recommendation">Recommendation</Link><Link href="/history">History</Link></nav><UserMenu /></div></header><div className="mx-auto max-w-[960px] px-5 py-12 sm:px-8 lg:py-16"><BackButton /><div className="mx-auto max-w-2xl text-center"><div className="mb-4 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#b5527a]">Personal styling <span className="h-1 w-1 rounded-full bg-[#c9796e]" /> LookFit</div><h1 className="font-serif text-5xl tracking-[-2px] text-[#302824]">Find your next <em className="text-[#b5527a]">favorite outfit.</em></h1><p className="mt-4 text-sm leading-6 text-[#887b73]">Tell us a little about your day and we&apos;ll curate looks that fit the moment.</p></div><form onSubmit={submit} className="mx-auto mt-10 rounded-2xl border border-[#e9e0d9] bg-[#fffdfb] p-6 shadow-[0_12px_30px_rgba(74,48,42,0.06)] sm:p-8"><div className="grid gap-5 sm:grid-cols-2">{filters.map(([label, options]) => <label key={label} className="block"><span className="mb-2 block text-xs font-semibold text-[#5e514a]">{label}</span><div className="relative"><select value={values[label]} onChange={event => update(label, event.target.value)} className="w-full appearance-none rounded-lg border border-[#e3d7cf] bg-[#fffdfb] px-4 py-3 text-sm capitalize text-[#403733] outline-none focus:border-[#c9796e] focus:ring-2 focus:ring-[#c9796e]/15">{options.map(option => <option key={option} value={option}>{option}</option>)}</select><ChevronDown size={15} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#9a8d84]" /></div></label>)}</div><div className="mt-8 flex justify-center border-t border-[#eee6e0] pt-7"><button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-[#b5527a] px-7 py-3.5 text-xs font-semibold text-white shadow-[0_8px_20px_rgba(181,82,122,0.2)] transition hover:bg-[#873957]">Find Outfits <ArrowRight size={15} /></button></div></form><div className="mt-6 flex items-center justify-center gap-2 text-xs text-[#9a8d84]">Your selections help us personalize every recommendation.</div></div></main>
}

export default function RecommendationPage() { return <ProtectedRoute><RecommendationFilters /></ProtectedRoute> }
