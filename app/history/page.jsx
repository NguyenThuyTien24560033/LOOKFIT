'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowRight, Undo2 } from 'lucide-react'
import AppHeader from '@/components/AppHeader'
import BackButton from '@/components/BackButton'
import ProtectedRoute from '@/components/ProtectedRoute'
import SavedLookCard from '@/components/history/SavedLookCard'
import LookDetailDialog from '@/components/history/LookDetailDialog'
import { primaryAction } from '@/components/history/styles'
import { removeLook, restoreLook, useSavedLooks } from '@/lib/saved-looks'

const UNDO_WINDOW_MS = 6000

function savedTime(look) {
  return Date.parse(look.savedAt) || 0
}

function HistoryContent() {
  const looks = useSavedLooks()
  const [selectedName, setSelectedName] = useState(null)
  const [removed, setRemoved] = useState(null)

  useEffect(() => {
    if (!removed) return
    const timer = window.setTimeout(() => setRemoved(null), UNDO_WINDOW_MS)
    return () => window.clearTimeout(timer)
  }, [removed])

  const sortedLooks = [...looks].sort((a, b) => savedTime(b) - savedTime(a))
  const selected = looks.find(look => look.name === selectedName) ?? null
  const hasSamples = looks.some(look => look.sample)

  const handleDelete = look => {
    const index = looks.findIndex(existing => existing.name === look.name)
    removeLook(look.name)
    setRemoved({ look, index })
  }

  const handleUndo = () => {
    restoreLook(removed.look, removed.index)
    setRemoved(null)
  }

  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#2b2623]">
      <AppHeader />
      <section className="mx-auto max-w-[1180px] px-5 py-10 sm:px-8 lg:py-14">
        <BackButton />
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#b5527a]">Style history</span>
            <h1 className="mt-3 font-serif text-5xl tracking-[-2px] text-[#302824]">Your saved looks.</h1>
            <p className="mt-3 max-w-lg text-sm leading-6 text-[#887b73]">Revisit outfits you have created and loved.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-[#ead5de] px-3 py-2 text-[11px] font-medium text-[#8e5267]">
              {looks.length} {looks.length === 1 ? 'look' : 'looks'}
            </span>
            <Link href="/recommendation" className={primaryAction}>
              Find a new look
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>

        {hasSamples && (
          <p className="mt-6 rounded-xl border border-[#e9e0d9] bg-[#fffdfb] px-4 py-3 text-xs leading-5 text-[#887b73]">
            Looks marked Sample are starter outfits. Save an outfit from Recommendation to add your own.
          </p>
        )}

        <div role="status" aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-5 z-40 flex justify-center px-5">
          {removed && (
            <div className="pointer-events-auto flex max-w-full flex-wrap items-center gap-4 rounded-xl border border-[#e9e0d9] bg-[#fffdfb] px-4 py-3 text-xs text-[#665a53] shadow-[0_14px_30px_rgba(74,48,42,0.18)]">
              <span>{`"${removed.look.name}" was removed from your history.`}</span>
              <button type="button" onClick={handleUndo} className="flex items-center gap-1.5 text-xs! font-semibold! text-[#b5527a] transition hover:text-[#9f4569] focus:outline-none focus-visible:underline">
                <Undo2 size={13} aria-hidden="true" />
                Undo
              </button>
            </div>
          )}
        </div>

        {sortedLooks.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-[#ddcec5] bg-[#fffdfb] p-10 text-center">
            <h2 className="font-serif text-2xl tracking-normal! text-[#403733]">No saved looks yet.</h2>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#887b73]">Looks you save from your recommendations will appear here.</p>
            <div className="mt-5 flex justify-center">
              <Link href="/recommendation" className={primaryAction}>
                Get recommendations
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sortedLooks.map(look => (
              <SavedLookCard key={look.name} look={look} onView={viewed => setSelectedName(viewed.name)} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </section>
      <LookDetailDialog look={selected} onClose={() => setSelectedName(null)} />
    </main>
  )
}

export default function HistoryPage() { return <ProtectedRoute><HistoryContent /></ProtectedRoute> }
