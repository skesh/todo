import { useTags } from "@/hooks/useTags";
import { useTodoStore } from "@/store/todosStore";
import { EyeIcon } from "lucide-react";
import { Badge } from "./ui/badge.tsx";
import { Toggle } from "./ui/toggle.tsx";

export default function Toolbar() {
  const isFiltred = useTodoStore((s) => s.isFiltred);
  const toogleFilter = useTodoStore((s) => s.toogleFilter)
  const tags = useTags()

  return (
    <div className='flex items-center gap-4 justify-between'>
      <Toggle onClick={toogleFilter} pressed={isFiltred} className='gap-2'>
        <EyeIcon className="group-data-[state=on]/toggle:fill-foreground" />
        {isFiltred ? 'hidden' : 'show'}
      </Toggle>

      <div className="flex gap-2 items-center">
        <span>Tags: </span>
        {[...tags].map((tag, index) => (
          <Badge variant="secondary" key={index}>{tag}</Badge>
        ))}
      </div>
    </div >
  )
}
