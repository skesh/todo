import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'
import { useUiActions, useUiSeletors } from '@/store/uiStore'

export default function useGlobalKeybindings() {
  const { menuOpen } = useUiSeletors()
  const { toggleMenu } = useUiActions()

  const lastKeyRef = useRef<string | null>(null)
  const lastTimeRef = useRef<number>(0)

  const navigate = useNavigate()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      const now = Date.now()
      const timeDiff = now - lastTimeRef.current

      if (e.key === 'h' && lastKeyRef.current === ',' && timeDiff < 300) {
        navigate('/')
        return
      }

      lastKeyRef.current = e.key
      lastTimeRef.current = now
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [navigate])
}
