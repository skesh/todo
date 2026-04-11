# Todo App

## Стек
- Electron + React + TypeScript
- Zostand для state management
- electron-store для локального хранения

## Структура
- `electron/` — Electron main process
- `src/assets/` — тут храним статические файлы
- `src/store/` — zostand стейты
- `src/components/` - храним компоненты проекта
- `src/components/ui/` - тут компоненты shadcn
- `src/components/ui-custom/` - тут своим переиспользуемые компоненты
- `src/hooks/` - тут храним методы для работы с стейтом что бы не захламлять стор
- `src/interfaces/` - пока тут все interfaces, types, enums, classes
- `src/keybindings` - тут конфигурации для задания комбинаций для разных частей приложения,
- `keybinding-sidebar.ts` - в нем храним хоткеи только по сайдбару и добавляем проверки что sidebarOpen
- `keybindings.ts` - он управляем задачами в остальном приложении добавляем проверки !sidebarOpen

## Команды
- `npm run dev` — dev mode
- `npm run build` — build
- `npm run electron:build` — упаковка в .app

## Инструкция по выполнению задач
Делаем только то что просят, если есть идеи лучше уточнить, результатом анализа должен стать план по которому позже будет делаться реализация, план делаем в markdown

## Требования
- macOS приложение
- Добавить поддержку iCloud позже
