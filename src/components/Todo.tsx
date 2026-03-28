import styles from "./todo.module.css";
import { ITodo } from "../interfaces/todo";

function Todo({ todo, isActive, index }: { todo: ITodo, isActive: boolean, index: number }) {
  return (
    <>
      <div className={`${styles.todo} ${isActive && styles.active}`}>
        {/* TODO: убрать лишний див */}
        <div className={styles.todoBody}>
          {index} {todo.title} {todo.created ? '+' : '-'}
        </div>
      </div>
    </>
  )
}

export default Todo
