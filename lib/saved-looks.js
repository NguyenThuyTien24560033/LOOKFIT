'use client'

import { useSyncExternalStore } from 'react'

const STORAGE_KEY = 'lookfit_saved_outfits'
const CHANGE_EVENT = 'lookfit:saved-looks'
const EMPTY = []

export const sampleLooks = [
  { name: 'Soft tailoring', detail: 'Linen shirt · Wide-leg trouser · Leather belt', score: 94, image: '/looks/soft-tailoring.png', savedAt: '2026-11-10T09:30:00', sample: true },
  { name: 'Weekend ease', detail: 'Silk blouse · Straight denim · Woven tote', score: 91, image: '/looks/weekend-ease.png', savedAt: '2026-11-06T18:15:00', sample: true },
  { name: 'Everyday edit', detail: 'Knit cardigan · Cotton tee · Tailored trouser · Soft loafers', score: 89, image: '/looks/everyday-edit.png', savedAt: '2026-11-02T08:05:00', sample: true },
]

let cachedRaw
let cachedLooks = EMPTY

function parse(raw) {
  // Nothing has ever been saved or deleted, so the starter looks are shown.
  if (raw === null) return sampleLooks
  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.filter(look => look && typeof look.name === 'string') : EMPTY
  } catch {
    return EMPTY
  }
}

function getSnapshot() {
  let raw = null
  try { raw = localStorage.getItem(STORAGE_KEY) } catch {}
  if (raw !== cachedRaw) {
    cachedRaw = raw
    cachedLooks = parse(raw)
  }
  return cachedLooks
}

function getServerSnapshot() {
  return EMPTY
}

function subscribe(onChange) {
  const onStorage = event => { if (event.key === null || event.key === STORAGE_KEY) onChange() }
  window.addEventListener('storage', onStorage)
  window.addEventListener(CHANGE_EVENT, onChange)
  return () => {
    window.removeEventListener('storage', onStorage)
    window.removeEventListener(CHANGE_EVENT, onChange)
  }
}

function write(looks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(looks))
  window.dispatchEvent(new Event(CHANGE_EVENT))
}

export function useSavedLooks() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

export function saveLook(outfit) {
  const looks = getSnapshot()
  if (looks.some(look => look.name === outfit.name)) return
  write([...looks, { ...outfit, status: 'Draft', savedAt: new Date().toISOString() }])
}

export function removeLook(name) {
  write(getSnapshot().filter(look => look.name !== name))
}

export function restoreLook(look, index) {
  const looks = getSnapshot()
  if (looks.some(existing => existing.name === look.name)) return
  const next = [...looks]
  next.splice(Math.min(index, next.length), 0, look)
  write(next)
}

export function formatSavedAt(value) {
  const date = new Date(value)
  if (!value || Number.isNaN(date.getTime())) return null
  return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' }).format(date)
}
