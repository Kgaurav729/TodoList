import { useEffect, useState } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CardContent, CardHeader, Card, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import toast from "react-hot-toast"
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from "@hello-pangea/dnd"

interface Todo {
  id: number
  title: string
  completed: boolean
  status: "pending" | "in-progress" | "completed"
}

const API_URL = "https://todolist-9d2o.onrender.com/api/todos"

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState("")
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editingTitle, setEditingTitle] = useState("")

  const fetchTodos = async () => {
    try {
      const res = await axios.get(API_URL)
      setTodos(res.data || [])
    } catch (err) {
      console.error("Error fetching todos", err)
      toast.error("Failed to fetch todos")
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  const addTodo = async () => {
    if (!newTodo.trim()) return

    const isDuplicate = todos.some(
      (todo) => todo.title.toLowerCase() === newTodo.trim().toLowerCase()
    )
    if (isDuplicate) {
      toast.error("Todo already exists!")
      return
    }

    try {
      await axios.post(API_URL, {
        title: newTodo.trim(),
        completed: false,
        status: "pending",
      })
      setNewTodo("")
      fetchTodos()
    } catch (err) {
      console.error("Error adding todo", err)
      toast.error("Failed to add todo")
    }
  }

  const deleteTodo = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/${id}`)
      fetchTodos()
    } catch (err) {
      console.error("Error deleting todo", err)
      toast.error("Failed to delete todo")
    }
  }

  const startEditing = (id: number, title: string) => {
    setEditingId(id)
    setEditingTitle(title)
  }

  const updateTodo = async () => {
    if (editingId === null || !editingTitle.trim()) return

    const currentTodo = todos.find((todo) => todo.id === editingId)
    if (!currentTodo) return

    try {
      await axios.put(`${API_URL}/${editingId}`, {
        title: editingTitle.trim(),
        completed: currentTodo.completed,
        status: currentTodo.status,
      })
      setEditingId(null)
      setEditingTitle("")
      fetchTodos()
      toast.success("Task updated!")
    } catch (err) {
      console.error("Error updating todo", err)
      toast.error("Failed to update todo")
    }
  }

  const onDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result

    if (!destination || destination.droppableId === source.droppableId) return

    const todoId = parseInt(draggableId)
    const newStatus = destination.droppableId as Todo["status"]

    // Optimistically update local state
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === todoId
          ? {
              ...todo,
              status: newStatus,
              completed: newStatus === "completed",
            }
          : todo
      )
    )

    try {
      const target = todos.find((t) => t.id === todoId)
      if (!target) return

      await axios.put(`${API_URL}/${todoId}`, {
        title: target.title,
        completed: newStatus === "completed",
        status: newStatus,
      })

      toast.success("Task moved!")
    } catch (err) {
      console.error("Error moving task", err)
      toast.error("Failed to move task")
    }
  }


  const renderTodoCard = (todo: Todo) => {
    if (editingId === todo.id) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-sm flex gap-2 items-center">
          <Input
            value={editingTitle}
            onChange={(e) => setEditingTitle(e.target.value)}
            className="rounded-lg"
          />
          <Button variant="outline" size="sm" onClick={updateTodo}>
            Save
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setEditingId(null)}>
            Cancel
          </Button>
        </div>
      )
    }

    return (
      <div className="bg-white p-3 rounded-lg shadow-sm flex justify-between items-center">
        <span className="truncate max-w-[200px]">{todo.title}</span>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => startEditing(todo.id, todo.title)}
          >
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => deleteTodo(todo.id)}
          >
            Delete
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <Card className="mb-6 shadow-lg border-2">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">📝 Task Board</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <Input
              placeholder="Add a new task..."
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              className="rounded-xl"
            />
            <Button onClick={addTodo} className="rounded-xl">
              Add
            </Button>
          </div>
          <Separator />
        </CardContent>
      </Card>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {["pending", "in-progress", "completed"].map((status) => (
            <Droppable droppableId={status} key={status}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`p-4 rounded-xl border min-h-[300px] ${
                    status === "pending"
                      ? "bg-gray-100"
                      : status === "in-progress"
                      ? "bg-yellow-100"
                      : "bg-green-100"
                  }`}
                >
                  <h2 className="text-lg font-semibold text-center capitalize mb-2">
                    {status.replace("-", " ")}
                  </h2>
                  <ul className="space-y-3">
                    {todos
                      .filter((todo) => todo.status === status)
                      .map((todo, index) => (
                        <Draggable
                          key={todo.id}
                          draggableId={String(todo.id)}
                          index={index}
                        >
                          {(provided) => (
                            <li
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              {renderTodoCard(todo)}
                            </li>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </ul>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  )
}

