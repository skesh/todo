import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'
import { useHotkeys } from '@/hooks/useHotkeys'
import { useUiActions, useUiSelectors } from '@/store/uiStore'

export default function useGlobalKeybindings() {
  const { toggleMenu, toggleSidebar } = useUiActions()
  const { editMode, todoOpen } = useUiSelectors()
  const lastKeyRef = useRef<string | null>(null)
  const lastTimeRef = useRef<number>(0)

  const navigate = useNavigate()

  useHotkeys(window, 'KeyH', () => toggleSidebar(), [editMode, todoOpen], { enabled: !todoOpen && editMode === 'normal' })

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      const now = Date.now()
      const timeDiff = now - lastTimeRef.current

      if (
        (e.key === 'h' || e.key === 'р') &&
        (lastKeyRef.current === ',' || lastKeyRef.current === 'б') &&
        timeDiff < 300
      ) {
        navigate('/')
        return
      }

      if (
        (e.key === 'f' || e.key === 'а') &&
        (lastKeyRef.current === ',' || lastKeyRef.current === 'б') &&
        timeDiff < 500
      ) {
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
