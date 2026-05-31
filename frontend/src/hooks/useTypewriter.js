import { useState, useEffect, useRef } from 'react'

export function useTypewriter(words, { typingSpeed = 80, deletingSpeed = 45, pauseMs = 1800 } = {}) {
  const [display, setDisplay]   = useState('')
  const [wordIdx, setWordIdx]   = useState(0)
  const [deleting, setDeleting] = useState(false)
  const pauseRef = useRef(false)

  useEffect(() => {
    const word = words[wordIdx % words.length]

    if (pauseRef.current) return

    const delay = deleting ? deletingSpeed : typingSpeed

    const id = setTimeout(() => {
      if (!deleting) {
        const next = word.slice(0, display.length + 1)
        setDisplay(next)
        if (next === word) {
          pauseRef.current = true
          setTimeout(() => {
            pauseRef.current = false
            setDeleting(true)
          }, pauseMs)
        }
      } else {
        const next = word.slice(0, display.length - 1)
        setDisplay(next)
        if (next === '') {
          setDeleting(false)
          setWordIdx(i => i + 1)
        }
      }
    }, delay)

    return () => clearTimeout(id)
  }, [display, deleting, wordIdx])

  return display
}
