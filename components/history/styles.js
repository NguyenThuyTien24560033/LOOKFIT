// globals.css has unlayered rules (`button, a { font: inherit }`, `a { color: inherit }`, heading
// letter-spacing) that outrank Tailwind utilities, so these properties need the `!` modifier.
const focusRing = 'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b5527a]/40 focus-visible:ring-offset-2'

export const primaryAction = `flex items-center justify-center gap-2 rounded-lg bg-[#b5527a] px-4 py-2.5 text-xs! font-semibold! text-white! transition hover:bg-[#9f4569] ${focusRing}`

export const secondaryAction = `flex items-center justify-center gap-2 rounded-lg border border-[#e3d7cf] px-3 py-2.5 text-xs! font-semibold! text-[#665a53] transition hover:border-[#d9a9a2] hover:bg-[#fff6f6] hover:text-[#a8453c] ${focusRing}`

export const cardTitle = 'font-serif text-xl tracking-normal! text-[#403733]'
