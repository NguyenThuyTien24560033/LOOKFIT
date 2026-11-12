'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { ArrowRight, X } from 'lucide-react'
import { formatSavedAt } from '@/lib/saved-looks'
import { primaryAction } from '@/components/history/styles'

export default function LookDetailDialog({ look, onClose }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (look && !dialog.open) dialog.showModal()
    if (!look && dialog.open) dialog.close()
  }, [look])

  const close = () => dialogRef.current?.close()
  const savedAt = look ? formatSavedAt(look.savedAt) : null
  const pieces = look?.detail ? look.detail.split(' · ') : []

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={event => { if (event.target === dialogRef.current) close() }}
      aria-labelledby="look-detail-title"
      className="m-auto w-[min(92vw,720px)] overflow-hidden rounded-2xl border border-[#e9e0d9] bg-[#fffdfb] p-0 text-[#2b2623] shadow-[0_24px_60px_rgba(74,48,42,0.22)] backdrop:bg-[#2b2623]/50"
    >
      {look && (
        <div className="grid sm:grid-cols-2">
          <img src={look.image} alt={`${look.name} outfit`} className="h-56 w-full bg-[#eaded5] object-cover sm:h-full sm:min-h-[380px]" />
          <div className="flex flex-col p-6 sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#b5527a]">{look.sample ? 'Sample look' : 'Saved look'}</span>
                <h2 id="look-detail-title" className="mt-2 font-serif text-3xl tracking-[-0.5px]! text-[#302824]">{look.name}</h2>
              </div>
              <button type="button" onClick={close} aria-label="Close look details" className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#e3d7cf] text-[#665a53] transition hover:bg-[#f5eee9] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b5527a]/40">
                <X size={16} aria-hidden="true" />
              </button>
            </div>
            {typeof look.score === 'number' && <p className="mt-3 text-sm font-semibold text-[#b5527a]">{look.score}% match</p>}
            {pieces.length > 0 && (
              <>
                <p id="look-detail-pieces" className="mt-6 text-xs font-semibold text-[#5e514a]">In this look</p>
                <ul aria-labelledby="look-detail-pieces" className="mt-2 flex flex-col gap-2 text-sm text-[#665a53]">
                  {pieces.map(piece => (
                    <li key={piece} className="flex items-center gap-2.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#c9796e]" aria-hidden="true" />
                      {piece}
                    </li>
                  ))}
                </ul>
              </>
            )}
            <p className="mt-6 text-xs text-[#887b73]">{savedAt ? <time dateTime={look.savedAt}>Saved {savedAt}</time> : 'Saved date not recorded'}</p>
            <Link href="/recommendation" className={`${primaryAction} mt-6 sm:mt-auto`}>
              Find a similar look
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
      )}
    </dialog>
  )
}
