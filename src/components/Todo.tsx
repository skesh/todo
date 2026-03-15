import styles from "./todo.module.css";
import { ITodo } from "../interfaces/todo";

function Todo(todo: ITodo) {
  return (
    <>
      <div className={styles.todo}>
        <div className={styles.todoBody}>
          {todo.title} {todo.created ? '+' : '-'}
        </div>
      </div>
    </>
  )
}

export default Todo
