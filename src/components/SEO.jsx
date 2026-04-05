import { useEffect } from 'react'

export default function SEO({ title, description }) {
  useEffect(() => {
    if (title) document.title = title

    let meta = document.querySelector('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.name = 'description'
      document.head.appendChild(meta)
    }
    if (description) meta.content = description
  }, [title, description])

  return null
}
