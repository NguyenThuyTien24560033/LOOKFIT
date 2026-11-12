'use client'

import { Clock3, Eye, Trash2 } from 'lucide-react'
import { formatSavedAt } from '@/lib/saved-looks'
import { cardTitle, primaryAction, secondaryAction } from '@/components/history/styles'

export default function SavedLookCard({ look, onView, onDelete }) {
  const savedAt = formatSavedAt(look.savedAt)

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-[#e9e0d9] bg-[#fffdfb] transition hover:-translate-y-1 hover:shadow-[0_12px_26px_rgba(74,48,42,0.1)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#eaded5]">
        <img src={look.image} alt={`${look.name} outfit`} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <span className="absolute left-3 top-3 rounded-full bg-[#fffdfb]/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#9b5c70]">
          {look.sample ? 'Sample' : look.status || 'Saved'}
        </span>
        {typeof look.score === 'number' && (
          <span className="absolute right-3 top-3 rounded-full bg-[#b5527a] px-2.5 py-1 text-[11px] font-semibold text-white">{look.score}% match</span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h2 className={cardTitle}>{look.name}</h2>
        {look.detail && <p className="mt-1.5 text-xs leading-5 text-[#887b73]">{look.detail}</p>}
        <p className="mt-3 flex items-center gap-1.5 text-xs text-[#887b73]">
          <Clock3 size={13} aria-hidden="true" />
          {savedAt ? <time dateTime={look.savedAt}>Saved {savedAt}</time> : <span>Saved date not recorded</span>}
        </p>
        <div className="mt-auto flex gap-2 pt-5">
          <button type="button" onClick={() => onView(look)} className={`${primaryAction} flex-1`}>
            <Eye size={14} aria-hidden="true" />
            View look
          </button>
          <button type="button" onClick={() => onDelete(look)} aria-label={`Delete ${look.name}`} className={secondaryAction}>
            <Trash2 size={14} aria-hidden="true" />
            Delete
          </button>
        </div>
      </div>
    </article>
  )
}
