import { ITodo } from "../interfaces/todo";
import styles from "./todo.module.css";
import { Item, ItemContent, ItemMedia, ItemTitle } from "./ui/item";
import { CircleIcon } from "lucide-react";

function Todo({ todo, isActive }: { todo: ITodo, isActive: boolean }) {
  return (
    <Item className={`${isActive && styles.active}`} data-todo>
      <ItemMedia variant="icon">
        <CircleIcon className="text-gray-600" />
      </ItemMedia>
      <ItemContent>
        <ItemTitle className="text-gray-400 text-base">{todo.title}</ItemTitle>
        {/* <ItemDescription>Description</ItemDescription> */}
      </ItemContent>
      {/* <ItemActions> */}
      {/*   <Button>Action</Button> */}
      {/* </ItemActions> */}
    </Item>
  )
}

export default Todo
