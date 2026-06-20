// Shared store for the /links hub buttons.
// Internal tool — persisted in localStorage so the Admin manager and the
// public /links page read/write the same list on this browser.

const KEY = 'sss_links'

export const DEFAULT_LINKS = [
  { id: 1, label: 'Book a Call',  note: 'Free 20-min discovery call',        href: 'https://links.scenesetstudio.com/f/book-a-call', primary: true },
  { id: 2, label: 'Pilot Program', note: 'Apply for the founding-client pilot', href: 'https://links.scenesetstudio.com/f/pilotprogram', primary: false },
]

export function getLinks() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return DEFAULT_LINKS
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : DEFAULT_LINKS
  } catch {
    return DEFAULT_LINKS
  }
}

export function saveLinks(list) {
  localStorage.setItem(KEY, JSON.stringify(list))
}

export const emptyLink = () => ({ id: Date.now(), label: '', note: '', href: '', primary: false })
