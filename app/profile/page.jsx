'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Check, ChevronDown, Ruler, Save, Sparkles } from 'lucide-react'
import BackButton from '@/components/BackButton'
import ProtectedRoute from '@/components/ProtectedRoute'
import UserMenu from '@/components/UserMenu'

const DRAFT_KEY = 'lookfit_profile_draft'
const initialMeasurements = { height: '', weight: '', bust: '', waist: '', hips: '' }
const colors = ['Black', 'White', 'Blue', 'Navy', 'Beige', 'Brown', 'Pink', 'Green', 'Grey', 'Mustard', 'Olive', 'Burgundy', 'Lavender', 'Peach', 'Rust', 'Teal']
const colorSwatches = { Black: '#1d1b1b', White: '#fffdfb', Blue: '#7da5c7', Navy: '#263b59', Beige: '#e6d6c4', Brown: '#8a624c', Pink: '#d59aae', Green: '#91a58b', Grey: '#9b9a9a', Mustard: '#d1a83f', Olive: '#7c8450', Burgundy: '#772f45', Lavender: '#b8a6ce', Peach: '#efb39e', Rust: '#ad5f45', Teal: '#5d9d98' }

function ProfileForm() {
  const [measurements, setMeasurements] = useState(initialMeasurements)
  const [selectedColors, setSelectedColors] = useState([])
  const [bodyShape, setBodyShape] = useState('')
  const [isEditing, setIsEditing] = useState(true)
  const [hasProfile, setHasProfile] = useState(false)
  const [message, setMessage] = useState('')
  const [draftReady, setDraftReady] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('lookfit_profile')
    if (!saved) return
    try {
      const profile = JSON.parse(saved)
      setMeasurements({ ...initialMeasurements, ...(profile.measurements || {}) })
      setSelectedColors(profile.colors || [])
      setBodyShape(profile.bodyShape || '')
      setHasProfile(Boolean(profile.bodyShape))
      setIsEditing(false)
    } catch {
      localStorage.removeItem('lookfit_profile')
    }
  }, [])

  useEffect(() => {
    try {
      const draft = JSON.parse(sessionStorage.getItem(DRAFT_KEY) || 'null')
      if (draft) {
        setMeasurements({ ...initialMeasurements, ...(draft.measurements || {}) })
        setSelectedColors(Array.isArray(draft.colors) ? draft.colors : [])
        setIsEditing(true)
      }
    } catch {}
    setDraftReady(true)
  }, [])

  useEffect(() => {
    if (!draftReady) return
    try {
      if (isEditing) sessionStorage.setItem(DRAFT_KEY, JSON.stringify({ measurements, colors: selectedColors }))
      else sessionStorage.removeItem(DRAFT_KEY)
    } catch {}
  }, [draftReady, isEditing, measurements, selectedColors])

  const updateMeasurement = (key, value) => setMeasurements(current => ({ ...current, [key]: value }))
  const toggleColor = color => {
    setSelectedColors(current => current.includes(color) ? current.filter(item => item !== color) : [...current, color])
    setMessage('')
  }
  const saveProfile = event => {
    event.preventDefault()
    const valid = Object.values(measurements).every(value => value.trim() && Number(value) > 0)
    if (!valid) { setMessage('Please enter valid measurements before saving.'); setBodyShape(''); return }
    const profile = { measurements, colors: selectedColors, bodyShape: 'Hourglass' }
    localStorage.setItem('lookfit_profile', JSON.stringify(profile))
    setBodyShape('Hourglass')
    setHasProfile(true)
    setIsEditing(false)
    setMessage('Profile saved and body shape updated successfully.')
  }

  return <main className="min-h-screen bg-[#faf8f5] text-[#2b2623]"><header className="border-b border-[#e9e0d9] bg-[#fffdfb]"><div className="mx-auto flex h-[82px] max-w-[1180px] items-center justify-between px-5 sm:px-8"><Link href="/home" aria-label="LookFit home"><img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/lookfit-logo-new-SgG0KVJPTSg9JSHg2oL4vzSMpzFO80.png" alt="LookFit" className="h-12 w-[150px] object-cover object-center" /></Link><nav className="hidden items-center gap-7 text-xs text-[#766a63] md:flex"><Link href="/home">Home</Link><Link className="active-nav font-medium text-[#b5527a]" href="/profile">Profile</Link><Link href="/recommendation">Recommendation</Link><Link href="/history">History</Link></nav><UserMenu /></div></header><div className="mx-auto max-w-[1180px] px-5 py-10 sm:px-8 lg:py-14"><BackButton /><div className="mb-10 max-w-2xl"><div className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#b5527a]">Your profile <span className="h-1 w-1 rounded-full bg-[#c9796e]" /> Personal fit</div><h1 className="font-serif text-4xl tracking-[-1.8px] text-[#302824] sm:text-5xl">Make it feel <em className="text-[#b5527a]">like you.</em></h1><p className="mt-3 text-sm leading-6 text-[#887b73]">Add your measurements and color preferences so every LookFit recommendation feels more personal.</p></div><form onSubmit={saveProfile} className="grid gap-6 lg:grid-cols-[1.3fr_.7fr]"><section className="rounded-2xl border border-[#e9e0d9] bg-[#fffdfb] p-6 sm:p-8"><div className="mb-7 flex items-start justify-between"><div><h2 className="font-serif text-2xl text-[#403733]">Your measurements</h2><p className="mt-1 text-xs text-[#9a8d84]">Use centimeters and kilograms for the best fit.</p></div><div className="grid h-10 w-10 place-items-center rounded-full bg-[#f3e2e2] text-[#b5527a]"><Ruler size={18} /></div></div><div className="grid gap-5 sm:grid-cols-2">{[['height', 'Height', 'cm'], ['weight', 'Weight', 'kg'], ['bust', 'Bust', 'cm'], ['waist', 'Waist', 'cm'], ['hips', 'Hips', 'cm']].map(([key, label, unit]) => <label key={key} className="block"><span className="mb-2 block text-xs font-medium text-[#5e514a]">{label}</span><div className="relative"><input type="number" min="1" step="0.1" value={measurements[key]} onChange={event => updateMeasurement(key, event.target.value)} placeholder={unit} readOnly={!isEditing} className="w-full rounded-lg border border-[#e3d7cf] bg-[#fffdfb] px-4 py-3 pr-12 text-sm text-[#403733] outline-none transition placeholder:text-[#c5b8af] focus:border-[#c9796e] focus:ring-2 focus:ring-[#c9796e]/10" /><span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[10px] uppercase tracking-wider text-[#aa9b92]">{unit}</span></div></label>)}</div><div className="hidden mt-8 flex flex-col justify-between gap-4 border-t border-[#eee6e0] pt-6 sm:flex-row sm:items-center"><div className="flex items-center gap-2 text-xs text-[#9a8d84]"><span className={`h-2 w-2 rounded-full ${isEditing ? 'bg-[#c9796e]' : 'bg-[#6e9d7c]'}`} />{isEditing ? 'Editing profile' : 'Profile saved'}</div><div className="flex items-center gap-2"><button type="button" onClick={() => setIsEditing(true)} disabled={isEditing} className="rounded-lg border border-[#e3d7cf] bg-[#fffdfb] px-4 py-2.5 text-xs font-medium text-[#766a63] transition hover:border-[#c9796e] disabled:cursor-not-allowed disabled:opacity-45">Edit Profile</button><button type="submit" disabled={!isEditing} className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#b5527a] px-4 py-2.5 text-xs font-semibold text-white shadow-[0_7px_18px_rgba(181,82,122,0.18)] transition hover:bg-[#873957] disabled:cursor-not-allowed disabled:bg-[#c9b9c0]"><Save size={14} />Save Changes</button></div></div><div className="hidden"><div className="flex items-center gap-2 text-xs text-[#9a8d84]"><Sparkles size={15} className="text-[#c9796e]" />Your data stays private to your profile.</div><button type="submit" className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#b5527a] px-5 py-3 text-xs font-semibold text-white shadow-[0_7px_18px_rgba(181,82,122,0.18)] transition hover:bg-[#873957]"><Save size={14} />{bodyShape ? 'Save Changes' : 'Create Profile'}</button></div></section><aside className="space-y-6"><section className="rounded-2xl border border-[#e9e0d9] bg-[#f5eee9] p-6"><h2 className="font-serif text-2xl text-[#403733]">Color preferences</h2><p className="mt-1 text-xs leading-5 text-[#9a8d84]">Choose the colors you reach for most.</p><div className="mt-6 grid grid-cols-2 gap-2.5">{colors.map(color => { const active = selectedColors.includes(color); return <button key={color} type="button" aria-label={`${color}${active ? ' selected' : ''}`} aria-pressed={active} disabled={!isEditing} onClick={() => toggleColor(color)} className={`group disabled:cursor-not-allowed disabled:opacity-75 flex items-center gap-2.5 rounded-full border px-3 py-2.5 text-left text-xs transition ${active ? 'border-[#b5527a] bg-[#ead5de] text-[#8e5267] shadow-[0_4px_12px_rgba(181,82,122,0.1)]' : 'border-[#e5d9d1] bg-[#fffdfb] text-[#665a53] hover:border-[#c9796e] hover:bg-[#fff8f5]'}`}><span className="relative grid h-5 w-5 shrink-0 place-items-center rounded-full border border-black/10" style={{ backgroundColor: colorSwatches[color] }}>{active && <Check size={12} strokeWidth={2.5} className={color === 'Black' || color === 'Navy' || color === 'Brown' ? 'text-white' : 'text-[#9b5c70]'} />}</span><span>{color}</span></button> })}</div></section><div className="rounded-2xl border border-[#e9e0d9] bg-[#fffdfb] p-4"><div className="flex items-center justify-between gap-3"><div><p className="text-xs font-medium text-[#403733]">Ready to update?</p><p className="mt-1 text-[11px] text-[#9a8d84]">Review your measurements and preferences first.</p></div><div className="flex shrink-0 items-center gap-2"><button type="button" onClick={() => setIsEditing(true)} disabled={isEditing} className="rounded-lg border border-[#e3d7cf] bg-[#fffdfb] px-3 py-2.5 text-xs font-medium text-[#766a63] transition hover:border-[#c9796e] disabled:cursor-not-allowed disabled:opacity-45">Edit Profile</button><button type="submit" disabled={!isEditing} className="inline-flex items-center gap-2 rounded-lg bg-[#b5527a] px-3 py-2.5 text-xs font-semibold text-white transition hover:bg-[#873957] disabled:cursor-not-allowed disabled:bg-[#c9b9c0]"><Save size={14} />Save Changes</button></div></div></div>{bodyShape && !isEditing && <section className="rounded-2xl border border-[#dcbec9] bg-[#ead5de] p-6"><div className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#9b5c70]"><Check size={14} /> Profile ready</div><h2 className="font-serif text-3xl text-[#633d4d]">Hourglass</h2><p className="mt-2 text-xs leading-5 text-[#805f6b]">Your proportions suggest a balanced hourglass shape. We&apos;ll use this to refine your styling suggestions.</p></section>}{message && <div role="status" className={`rounded-lg px-4 py-3 text-xs ${bodyShape ? 'bg-[#edf6ef] text-[#47745c]' : 'bg-[#fff0ed] text-[#a34f45]'}`}>{message}</div>}</aside></form></div></main>
}

export default function ProfilePage() { return <ProtectedRoute><ProfileForm /></ProtectedRoute> }
