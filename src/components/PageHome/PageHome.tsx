import Toolbar from "./Toolbar"
import Footer from "./Footer"
import TodoList from "../Todo/TodoList"

const PageHome = () => (
  <>
    <Toolbar />
    <div className="flex-1 overflow-y-auto">
      <TodoList />
    </div>
    <Footer />
  </>
)

export default PageHome
