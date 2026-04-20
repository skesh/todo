'use client'

import { FolderIcon, HomeIcon, InboxIcon } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import { useProjectSelectors } from '@/store/projectsStore'
import { useUiActions, useUiSeletors } from '@/store/uiStore'

export function CommandMenu() {
  const { menuOpen } = useUiSeletors()
  const { toggleMenu } = useUiActions()
  const { projects } = useProjectSelectors()
  const navigate = useNavigate()

  const listRef = useRef<HTMLDivElement>(null)
  const lastKeyRef = useRef<string | null>(null)
  const lastTimeRef = useRef<number>(0)

  useEffect(() => {
    if (!menuOpen) return

    const down = (e: KeyboardEvent) => {
      const now = Date.now()

      if ((e.key === 'Escape' || e.key === 'q') && menuOpen) {
        e.preventDefault()
        toggleMenu()
        return
      }

      if (menuOpen) {
        if (e.key === 'j') {
          e.preventDefault()
          const listEl = listRef.current
          if (listEl) {
            listEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))
          }
          return
        }

        if (e.key === 'k') {
          e.preventDefault()
          const listEl = listRef.current
          if (listEl) {
            listEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }))
          }
          return
        }

        if (e.key === 'Enter' || e.key === 'l') {
          e.preventDefault()
          const selected = listRef.current?.querySelector('[role="option"][aria-selected="true"]')
          if (selected) {
            selected.dispatchEvent(new MouseEvent('click', { bubbles: true }))
          }
        }
      }

      lastKeyRef.current = e.key
      lastTimeRef.current = now
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [menuOpen])

  return (
    <div className="flex flex-col gap-4">
      {menuOpen && (
        <CommandDialog open={menuOpen}>
          <Command>
            <CommandList ref={listRef}>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Navigation">
                <CommandItem
                  value="home"
                  onSelect={() => {
                    navigate('/')
                    toggleMenu()
                  }}
                >
                  <HomeIcon />
                  <span>Home</span>
                </CommandItem>
                <CommandItem
                  value="inbox"
                  onSelect={() => {
                    navigate('/inbox')
                    toggleMenu()
                  }}
                >
                  <InboxIcon />
                  <span>Inbox</span>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />

              {projects.length > 0 && (
                <CommandGroup heading="Projects">
                  {projects.map((p) => (
                    <CommandItem
                      key={p.id}
                      value={p.id}
                      onSelect={() => {
                        navigate(`/project/${p.id} `)
                        toggleMenu()
                      }}
                    >
                      <FolderIcon />
                      <span>{p.name}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </CommandDialog>
      )}
    </div>
  )
}
