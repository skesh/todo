import { type DependencyList, useEffect, useRef } from 'react'

export function useHotkeys(
  target: EventTarget,
  key: string,
  onPress: () => void,
  deps?: DependencyList,
) {
  const onPressRef = useRef(onPress)
  onPressRef.current = onPress

  useEffect(() => {
    const handleKeyDown = (e: Event) => {
      if (key.slice(0, 3) === 'Key') {
        if ((e as KeyboardEvent).code === key) {
          onPressRef.current()
        }
      } else {
        if ((e as KeyboardEvent).key === key) {
          onPressRef.current()
        }
      }
    }

    target.addEventListener('keydown', handleKeyDown)
    return () => target.removeEventListener('keydown', handleKeyDown)
  }, deps)
}

