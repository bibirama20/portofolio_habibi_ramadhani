import { useEffect, useRef } from 'react'

export function useScrollReveal() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const show = () =>
      el.querySelectorAll('.reveal').forEach(child => child.classList.add('visible'))

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          show()
          obs.disconnect()
        }
      },
      { threshold: 0, rootMargin: '0px 0px -40px 0px' }
    )

    /* Jika section sudah terlihat saat mount (mis. Hero langsung di viewport),
       langsung tampilkan tanpa menunggu scroll */
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight) {
      show()
    } else {
      obs.observe(el)
    }

    return () => obs.disconnect()
  }, [])

  return ref
}
