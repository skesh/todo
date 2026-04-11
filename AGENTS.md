# Todo App

## Зависимости / Стек
- `Electron` + React + TypeScript
- `shadcn/ui` — UI компоненты
- `date-fns` — работа с датами
- `lucide-react` — иконки
- `zustand` - state management
- `electron-store` для локального хранения

## electron-store
- `items` — массив задач
- `projects` — массив проектов

### Stores
- `todosStore.ts` — задачи
- `projectsStore.ts` — проекты  
- `uiStore.ts` — UI состояние (sidebarOpen, modals...)

## Структура
- `electron/` — Electron main process
- `src/assets/` — тут храним статические файлы
- `src/store/` — zustand файлы сторов, описание сторов ниже:
- `src/components/` - храним компоненты проекта
- `src/components/ui/` - тут компоненты shadcn
- `src/components/ui-custom/` - тут своим переиспользуемые компоненты
- `src/hooks/` - тут храним методы которые не относятся к данным стора а выполняют утилитарные функции и не управляют напрямую данными в сторе
- `src/interfaces/` - пока тут все interfaces, types, enums, classes
- `src/keybindings` - тут конфигурации для задания комбинаций для разных частей приложения, описание каждого файла ниже:
- `sidebar-keybinding.ts` - в нем храним хоткеи только по сайдбару и добавляем проверки что sidebarOpen
- `keybindings.ts` - он управляем задачами в остальном приложении добавляем проверки !sidebarOpen

## Команды
- `npm run dev` — dev mode
- `npm run build` — build

## Инструкция по выполнению задач
Делаем только то что просят, если есть идеи лучше уточнить, результатом анализа должен стать план по которому позже будет делаться реализация, план делаем в markdown

## Требования
- macOS приложение
- Добавить поддержку iCloud позже
