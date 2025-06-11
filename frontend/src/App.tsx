import { Toaster } from "react-hot-toast"
import TodoList from "./pages/TodoList"

export default function App() {
  return (
    <>
      <Toaster position="top-center" toastOptions={{
      className: 'rounded-lg shadow-md border bg-white dark:bg-zinc-900 dark:text-white',
      duration: 3000,
      }}/>
      <TodoList />
    </>
  )
}


