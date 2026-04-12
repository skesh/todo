import { useTodoSelectors } from "@/store/todosStore";
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "../ui/drawer";
import EditTodo from "./EditTodo";

export default function TodoDrawer() {
  const { mode } = useTodoSelectors()

  return (
    <Drawer open={!!mode}>
      <DrawerContent>
        <DrawerHeader hidden={true}>
          <DrawerTitle>Title</DrawerTitle>
          <DrawerDescription>Description</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <EditTodo mode={mode} />
          {/* <DrawerClose> */}
          {/*   <Button variant="outline">Cancel</Button> */}
          {/* </DrawerClose> */}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
