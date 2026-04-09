import { useEffect } from 'react';
import './App.css';
import TodoList from './components/TodoList';
import { useTodoStore } from './store/todosStore';
import keybindings from './keybindings/keybindings';
import { Toggle } from './components/ui/toggle';
import { EyeIcon } from 'lucide-react';

function App() {
  const initialize = useTodoStore((s) => s.initialize);
  const isFiltred = useTodoStore((s) => s.isFiltred);
  const toogleFilter = useTodoStore((s) => s.toogleFilter)

  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  keybindings();



  return (
    <>
      <div className='flex-col flex-1'>
        <div className='flex justify-center'>
          <Toggle onClick={toogleFilter} pressed={isFiltred} className='gap-2'>
            <EyeIcon className="group-data-[state=on]/toggle:fill-foreground" />
            {isFiltred ? 'hide new' : 'show all'}
          </Toggle>
        </div>

        <TodoList />
      </div>
    </>
  )
}

export default App
