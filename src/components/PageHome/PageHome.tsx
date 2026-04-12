import Toolbar from "./Toolbar"
import Footer from "./Footer"
import TodoList from "../Todo/TodoList"
import TodoDrawer from "../Todo/TodoDrawer"

const PageHome = () => (
  <>
    <Toolbar />
    <div className="flex-1 overflow-y-auto">
      <TodoList />
    </div>
    <Footer />
    <TodoDrawer />
  </>
)

export default PageHome
