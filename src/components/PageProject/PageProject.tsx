import { IProject } from '@/interfaces/project'
import { useProjectActions, useProjectSelectors } from '@/store/projectsStore'
import { useTodoSelectors } from '@/store/todosStore'
import { useParams } from 'react-router'
import { Textarea } from '../ui/textarea'
import TodoDrawer from '../Todo/TodoDrawer'
import TodoList from '../Todo/TodoList'
import useGlobalKeybindings from '@/keybindings/global-keybindings'

export default function PageProject() {
  const { id } = useParams<{ id: string }>()

  const { projects } = useProjectSelectors()
  const { editProject } = useProjectActions()
  const { todos } = useTodoSelectors()

  const activeProject = projects.find((p) => p.id === id)
  const projectTodos = todos.filter((t) => t.projectId === id)

  useGlobalKeybindings()

  function updateProjectField(field: keyof IProject, value: any) {
    if (id && activeProject) {
      editProject(id, { ...activeProject, [field]: value })
    }
  }

  return (
    <>
      {activeProject ? (
        <div className="flex flex-col px-10 py-10 gap-4">
          <span className="text-[36px]">{activeProject.name}</span>
          <Textarea
            placeholder="Description..."
            value={activeProject.description}
            onChange={(e) => updateProjectField('description', e.target.value)}
          />

          <TodoList todos={projectTodos} />

          <TodoDrawer />
        </div>
      ) : (
        <div>Project not found</div>
      )}
    </>
  )
}
