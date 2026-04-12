import { IProject } from "@/interfaces/project";
import { useProjectActions, useProjectSelectors } from "@/store/projectsStore";
import { useTodoSelectors } from "@/store/todosStore";
import { useEffect } from "react";
import { useParams } from "react-router";
import { Textarea } from "../ui/textarea";

export default function PageProject() {
  const { id } = useParams<{ id: string }>()

  const { activeProject } = useProjectSelectors()
  const { editProject, setId } = useProjectActions()
  const { todos } = useTodoSelectors()

  const projectTodos = todos.filter(t => t.projectId === id)

  useEffect(() => {
    if (id && !activeProject) {
      setId(id)
    }
  })

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
    </>
  )
}
