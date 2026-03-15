import { ITodo } from "../interfaces/todo";
import Todo from "./Todo"
import styles from "./TodoList.module.css"

function TodoList({ todos }: { todos: ITodo[] }) {
  return (
    <>
      <div className={styles.todoList}>
        {todos.map(t => (
          <Todo {...t}></Todo>
        ))}
      </div>
    </>
  )
}

export default TodoList;
