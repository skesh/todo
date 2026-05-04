import { useHotkeys } from '@/hooks/useHotkeys'
import { useProjectActions, useProjectSelectors } from '@/store/projectsStore'
import { useUiActions, useUiSelectors } from '@/store/uiStore'

export function useSidebarKeybindings(
  index: number,
  setIndex: (result: number) => void,
  onEnter: (id: string) => void,
) {
  const { sidebarOpen, editProjectOpen, editMode } = useUiSelectors()
  // TODO: вынести active index в компонент или стор
  const { setEditProject } = useUiActions()
  const { projects } = useProjectSelectors()
  const { setId } = useProjectActions()

  const hotkeysEnable = sidebarOpen && !editProjectOpen && editMode === 'normal'

  useHotkeys(
    window,
    'j',
    () => {
      if (index < projects.length - 1) {
        setIndex(index + 1)
        setId(projects[index + 1]?.id)
      } else {
        setIndex(0)
        setId(projects[0]?.id)
      }
    },
    [sidebarOpen, editMode, editProjectOpen, index, projects],
    { enabled: hotkeysEnable },
  )

  useHotkeys(
    window,
    'k',
    () => {
      if (index > 0) {
        setIndex(index - 1)
        setId(projects[index - 1]?.id)
      } else {
        setIndex(projects.length - 1)
        setId(projects[projects.length - 1]?.id)
      }
    },
    [sidebarOpen, editMode, editProjectOpen, index, projects],
    { enabled: hotkeysEnable },
  )

  useHotkeys(window, 'o', () => setEditProject(true), [sidebarOpen, editMode, editProjectOpen], {
    enabled: hotkeysEnable,
  })

  useHotkeys(window, 'l', () => onEnter(projects[index].id), [sidebarOpen, editMode, editProjectOpen], {
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
