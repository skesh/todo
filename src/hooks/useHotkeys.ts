import { type DependencyList, useEffect, useRef } from 'react'

const EN_TO_RU: Record<string, string> = {
  q: 'й', w: 'ц', e: 'у', r: 'к', t: 'е', y: 'н', u: 'г', i: 'ш', o: 'щ', p: 'з',
  a: 'ф', s: 'ы', d: 'в', f: 'а', g: 'п', h: 'р', j: 'о', k: 'л', l: 'д',
  z: 'я', x: 'ч', c: 'с', v: 'м', b: 'и', n: 'т', m: 'ь',
}

function toRu(key: string): string | undefined {
  const ru = EN_TO_RU[key.toLowerCase()]
  if (!ru) return undefined
  return key === key.toUpperCase() ? ru.toUpperCase() : ru
}

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

    const isCodeKey = key.slice(0, 3) === 'Key'
    const ruKey = !isCodeKey ? toRu(key) : undefined

    const handleKeyDown = (e: Event) => {
      const ke = e as KeyboardEvent
      const matched = isCodeKey ? ke.code === key : ke.key === key || (!!ruKey && ke.key === ruKey)

      if (matched) {
        onPressRef.current()
        e.preventDefault()
        e.stopPropagation()
      }
    }

    target.addEventListener('keydown', handleKeyDown)
    return () => target.removeEventListener('keydown', handleKeyDown)
  }, deps)
}
