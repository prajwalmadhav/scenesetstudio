// Shared store for the /qrcode hub buttons — the landing page linked from
// printed QR codes. Separate from /links so print destinations can differ
// from the social bio. Persisted in localStorage so the Admin manager and
// the public /qrcode page read/write the same list on this browser.

const KEY = 'sss_qrcode_links'

export const DEFAULT_QR_LINKS = [
  { id: 1, label: 'Book a Call',  note: 'Free 20-min discovery call', href: 'https://links.scenesetstudio.com/f/book-a-call', primary: true },
  { id: 2, label: 'View Our Work', note: 'See recent projects',       href: 'https://scenesetstudio.com/work', primary: false },
]

export function getQrLinks() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return DEFAULT_QR_LINKS
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : DEFAULT_QR_LINKS
  } catch {
    return DEFAULT_QR_LINKS
  }
}

export function saveQrLinks(list) {
  localStorage.setItem(KEY, JSON.stringify(list))
}

export const emptyQrLink = () => ({ id: Date.now(), label: '', note: '', href: '', primary: false })
