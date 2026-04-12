import { useTodoActions, useTodoSelectors } from "@/store/todosStore";
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "../ui/drawer";
import EditTodo from "./EditTodo";
import { useEffect } from "react";
import { useUIStore } from "@/store/uiStore";

export default function TodoDrawer() {
  const { mode } = useTodoSelectors()
  const { setMode } = useTodoActions()
  const sidebarOpen = useUIStore((s) => s.sidebarOpen)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'o') {
        if (!mode) {
          e.stopPropagation()
          e.preventDefault()
          setMode('add')
        }
        return;
      }

      if (e.key === 'Escape') {
        e.stopPropagation()
        e.preventDefault()
        setMode(false)
        return;
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [mode, sidebarOpen])

  return (
    <Drawer open={!!mode}>
      <DrawerContent>
        <DrawerHeader hidden={true}>
          <DrawerTitle>Title</DrawerTitle>
          <DrawerDescription>Description</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <EditTodo mode={mode} />
          {/* <DrawerClose> */}
          {/*   <Button variant="outline">Cancel</Button> */}
          {/* </DrawerClose> */}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
