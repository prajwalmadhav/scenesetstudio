import { useEffect } from 'react'

const SELECTORS = [
  '.hero-btn',
  '.navbar__cta',
  '.cta-btn',
  '.footer-review-btn',
  '.svc-nav-btn',
]

export default function useButtonRipple() {
  useEffect(() => {
    function onEnter(e) {
      const btn = e.currentTarget
      const rect = btn.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      btn.style.setProperty('--rx', `${x}%`)
      btn.style.setProperty('--ry', `${y}%`)
    }

    const btns = document.querySelectorAll(SELECTORS.join(','))
    btns.forEach(btn => btn.addEventListener('mouseenter', onEnter))

    // Re-attach on DOM mutations (navigations)
    const observer = new MutationObserver(() => {
      const fresh = document.querySelectorAll(SELECTORS.join(','))
      fresh.forEach(btn => {
        btn.removeEventListener('mouseenter', onEnter)
        btn.addEventListener('mouseenter', onEnter)
      })
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      btns.forEach(btn => btn.removeEventListener('mouseenter', onEnter))
      observer.disconnect()
    }
  }, [])
}
