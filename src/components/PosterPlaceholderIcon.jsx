const ICONS = [
  (
    <path d="M8 18h16M8 25h10M8 32h22M34 18l8 8-8 8M38 26H24" />
  ),
  (
    <>
      <circle cx="25" cy="25" r="11" />
      <path d="M25 14v22M14 25h22M17.5 17.5l15 15M32.5 17.5l-15 15" />
    </>
  ),
  (
    <>
      <path d="M14 34V17l11-6 11 6v17l-11 6-11-6Z" />
      <path d="M14 17l11 7 11-7M25 24v16" />
    </>
  ),
  (
    <>
      <path d="M12 32h8l16-16 6 6-16 16h-8v-6Z" />
      <path d="M33 19l6 6M11 12h14M11 18h8" />
    </>
  ),
  (
    <>
      <rect x="10" y="13" width="28" height="24" />
      <path d="M16 19h16M16 25h10M16 31h16M39 18l5-3v20l-5-3" />
    </>
  ),
  (
    <>
      <path d="M25 10v30M10 25h30" />
      <path d="M15 15l20 20M35 15L15 35" />
      <circle cx="25" cy="25" r="5" />
    </>
  ),
]

export default function PosterPlaceholderIcon({ variant = 0 }) {
  return (
    <svg
      className="poster-placeholder-icon"
      viewBox="0 0 50 50"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {ICONS[variant % ICONS.length]}
    </svg>
  )
}
