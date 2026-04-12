import { IProject } from "@/interfaces/project";
import { useProjectActions, useProjectSelectors } from "@/store/projectsStore";
import { useTodoActions, useTodoSelectors } from "@/store/todosStore";
import { useUIStore } from "@/store/uiStore";
import { useEffect } from "react";
import { useParams } from "react-router";
import EditTodo from "../Todo/EditTodo";
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "../ui/drawer";
import { Textarea } from "../ui/textarea";

function PageProject() {
  const { id } = useParams<{ id: string }>()

  const { activeProject } = useProjectSelectors()
  const { editProject, setId } = useProjectActions()

  const { mode, todos } = useTodoSelectors()
  const { setMode } = useTodoActions()

  const sidebarOpen = useUIStore((s) => s.sidebarOpen)

  const projectTodos = todos.filter(t => t.projectId === id)

  useEffect(() => {
    if (id && !activeProject) {
      setId(id)
    }
  })

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

  function updateProjectField(field: keyof IProject, value: any) {
    if (id && activeProject) {
      editProject(id, { ...activeProject, [field]: value })
    }
  }

  return (
    <>
      {!!activeProject && <div className="flex flex-col px-10 py-10">
        <span className="text-[36px]">{activeProject.name}</span>
        <Textarea placeholder="Description..." value={activeProject.description} className="mt-4" onChange={(e) => updateProjectField('description', e.target.value)} />
        {projectTodos.map((t, index) => <span key={index}>{t.id}</span>)}
      </div>
      }

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
    </>
  )
}

export default PageProject;
