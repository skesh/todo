import { useHotkeys } from '@/hooks/useHotkeys'
import { useUiActions, useUiSelectors } from '@/store/uiStore'

export function useSidebarKeybindings(
  index: number,
  setIndex: (result: number) => void,
  totalLength: number,
  onEnter: () => void,
) {
  const { sidebarOpen, editProjectOpen, editMode } = useUiSelectors()
  const { setEditProject } = useUiActions()

  const hotkeysEnable = sidebarOpen && !editProjectOpen && editMode === 'normal'

  useHotkeys(
    window,
    'j',
    () => setIndex(index < totalLength - 1 ? index + 1 : 0),
    [sidebarOpen, editMode, editProjectOpen, index, totalLength],
    { enabled: hotkeysEnable },
  )

  useHotkeys(
    window,
    'k',
    () => setIndex(index > 0 ? index - 1 : totalLength - 1),
    [sidebarOpen, editMode, editProjectOpen, index, totalLength],
    { enabled: hotkeysEnable },
  )

  useHotkeys(window, 'o', () => setEditProject(true), [sidebarOpen, editMode, editProjectOpen], {
    enabled: hotkeysEnable,
  })

  useHotkeys(window, 'l', () => onEnter(), [sidebarOpen, editMode, editProjectOpen], {
    enabled: hotkeysEnable,
  })

  // useHotkeys(window, 'D', () => deleteById(), [sidebarOpen, editMode, editProjectOpen], {
  //   enabled: hotkeysEnable,
  // })

  useHotkeys(
    window,
    'Escape',
    () => {
      if (editProjectOpen) {
        setEditProject(false)
      }
    },
    [sidebarOpen, editMode, editProjectOpen],
    {
      enabled: sidebarOpen && editMode === 'normal' && editProjectOpen,
    },
  )
}
