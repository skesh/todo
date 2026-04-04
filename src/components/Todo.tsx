import styles from "./todo.module.css";
import { ITodo } from "../interfaces/todo";

function Todo({ todo, isActive }: { todo: ITodo, isActive: boolean }) {
  return (
    <div className={`${styles.todo} ${isActive && styles.active}`} data-todo>
      {todo.title}
    </div>
  )
}

export default Todo
