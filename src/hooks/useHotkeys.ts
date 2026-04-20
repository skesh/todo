import { type DependencyList, useEffect, useRef } from 'react'

export function useHotkeys(
  target: EventTarget,
  key: string,
  onPress: () => void,
  deps?: DependencyList,
  extra?: { enabled: boolean },
) {
  const onPressRef = useRef(onPress)
  onPressRef.current = onPress

  useEffect(() => {
    if (extra?.enabled === false) return

    const handleKeyDown = (e: Event) => {
      if (key.slice(0, 3) === 'Key') {
        if ((e as KeyboardEvent).code === key) {
          onPressRef.current()
          e.preventDefault()
          e.stopPropagation()
        }
      } else {
        if ((e as KeyboardEvent).key === key) {
          onPressRef.current()
          e.preventDefault()
          e.stopPropagation()
        }
      }
    }

    target.addEventListener('keydown', handleKeyDown)
    return () => target.removeEventListener('keydown', handleKeyDown)
  }, deps)
}
