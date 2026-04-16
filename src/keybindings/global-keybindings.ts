import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'

export default function useGlobalKeybindings() {
  const lastKeyRef = useRef<string | null>(null)
  const lastTimeRef = useRef<number>(0)

  const navigate = useNavigate()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const now = Date.now()
      const timeDiff = now - lastTimeRef.current

      if (e.key === 'h' && lastKeyRef.current === ',' && timeDiff < 300) {
        navigate('/')
        return
      }

      lastKeyRef.current = e.key
      lastTimeRef.current = now
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [navigate])
}
