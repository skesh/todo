'use client'

import { BracesIcon, FolderIcon, HomeIcon, InboxIcon, PlusIcon } from 'lucide-react'
import { useEffect, useRef } from 'react'
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command'
import { useProjectSelectors } from '@/store/projectsStore'
import { useUiActions, useUiSeletors } from '@/store/uiStore'

export function CommandMenu() {
  const { menuOpen } = useUiSeletors()
  const { toggleMenu } = useUiActions()
  const { projects } = useProjectSelectors()

  const lastKeyRef = useRef<string | null>(null)
  const lastTimeRef = useRef<number>(0)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      const now = Date.now()
      const timeDiff = now - lastTimeRef.current

      if (e.key === 'Escape' && menuOpen) {
        e.preventDefault()
        toggleMenu()
      }

      if (e.key === 'f' && lastKeyRef.current === ',' && timeDiff < 300 && !menuOpen) {
        e.preventDefault()
        toggleMenu()
        console.log('work')
        return
      }
      lastKeyRef.current = e.key
      lastTimeRef.current = now
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [menuOpen])

  return (
    <div className="flex flex-col gap-4">
      <CommandDialog open={menuOpen}>
        <Command>
          {/* <CommandInput placeholder="Type a command or search..." autoFocus={false} /> */}
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Navigation">
              <CommandItem>
                <HomeIcon />
                <span>Home</span>
                <CommandShortcut>⌘H</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <InboxIcon />
                <span>Inbox</span>
                <CommandShortcut>⌘I</CommandShortcut>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />

            {projects.length > 0 && (
              <CommandGroup heading="Projects">
                {projects.map((p) => (
                  <CommandItem key={p.id}>
                    <BracesIcon />
                    <span>{p.name}</span>
                    {/* <CommandShortcut>⌘N</CommandShortcut> */}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  )
}
