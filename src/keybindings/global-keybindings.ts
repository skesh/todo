import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'
import { useUiActions } from '@/store/uiStore'

export default function useGlobalKeybindings() {
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

      if (e.key === 'f' && lastKeyRef.current === ',' && timeDiff < 500) {
        toggleMenu()
        return
      }

      if ((e.metaKey || e.ctrlKey) && e.code === 'KeyH') {
        e.preventDefault()
        window.ipcRenderer.invoke('window:minimize')
        return
      }

      lastKeyRef.current = e.key
      lastTimeRef.current = now
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [navigate])
}
