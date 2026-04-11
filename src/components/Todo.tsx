import { cn } from "@/lib/utils";
import { CircleIcon } from "lucide-react";
import { ITodo } from "../interfaces/todo";
import styles from "./todo.module.css";
import { Badge } from "./ui/badge";
import { Item, ItemContent, ItemMedia, ItemTitle } from "./ui/item";

function Todo({ todo, isActive }: { todo: ITodo, isActive: boolean }) {
  return (
    <Item className={cn(`${isActive && styles.active}`, styles.todoItem)} data-todo>
      <ItemMedia variant="icon">
        <CircleIcon className="text-gray-600" />
      </ItemMedia>
      <ItemContent>
        <ItemTitle className="text-gray-400 text-base">{todo.title}</ItemTitle>
        {/* <ItemDescription>{todo.description}</ItemDescription> */}
      </ItemContent>
      <div>{todo.date}</div>
      <div>{todo.tags?.length > 0 && todo.tags.map((t, index) => <Badge variant="secondary" key={index}>{t}</Badge>)}</div>
      {/* <ItemActions> */}
      {/*   <Button>Action</Button> */}
      {/* </ItemActions> */}
    </Item>
  )
}

export default Todo
