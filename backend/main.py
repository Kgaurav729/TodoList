from sanic import Sanic
from sanic.response import json
from sanic_cors import CORS
from db import init_db, DB_NAME
import aiosqlite

app = Sanic("todo-backend")
CORS(app, origins=["https://todolist-683f3c.netlify.app/"], supports_credentials=True)

@app.listener("before_server_start")
async def setup_db(app, loop):
    await init_db()

@app.get("/ping")
async def ping(request):
    return json({"message": "pong"})

@app.get("/api/todos")
async def get_todos(request):
    async with aiosqlite.connect(DB_NAME) as db:
        db.row_factory = aiosqlite.Row  
        cursor = await db.execute("SELECT id, title, completed, status FROM todos")
        rows = await cursor.fetchall()
        todos = [dict(row) for row in rows]
        return json(todos, status=200)

@app.post("/api/todos")
async def create_todo(request):
    data = request.json
    title = data.get("title")
    # completed = data.get("completed", False)

    if not title:
        return json({"error": "Title is required"}, status=400)
    
    # Checking for duplicate title (case-insensitive)
    async with aiosqlite.connect(DB_NAME) as db:
        db.row_factory = aiosqlite.Row
        cursor = await db.execute("SELECT * FROM todos WHERE LOWER(title) = LOWER(?)", (title,))
        existing = await cursor.fetchone()
        if existing:
            return json({"error": "A todo with this title already exists"}, status=409)

        # here i am Inserting with default completed and status values
        cursor = await db.execute(
            "INSERT INTO todos (title, completed, status) VALUES (?, ?, ?)",
            (title, False, "pending")
        )
        await db.commit()
        todo_id = cursor.lastrowid
        return json({"id": todo_id, "title": title}, status=201)

@app.put("/api/todos/<todo_id:int>")
async def update_todo(request, todo_id):
    data = request.json
    title = data.get("title")
    # completed = data.get("completed",False)
    completed = data.get("completed")
    status = data.get("status", "pending")

    if not title:
        return json({"error": "Title is required"}, status=400)


    async with aiosqlite.connect(DB_NAME) as db:
        cursor = await db.execute("SELECT * FROM todos WHERE id = ?", (todo_id,))
        todo = await cursor.fetchone()
        if not todo:
            return json({"error": "Todo not found"}, status=404)

        await db.execute("UPDATE todos SET title = ?, completed = ?, status = ? WHERE id = ?", (title, int(completed),status, todo_id))
        await db.commit()
        return json({"id": todo_id, "title": title,"status":status, "completed": completed})

@app.delete("/api/todos/<todo_id:int>")
async def delete_todo(request, todo_id):
    async with aiosqlite.connect(DB_NAME) as db:
        cursor = await db.execute("SELECT * FROM todos WHERE id = ?", (todo_id,))
        todo = await cursor.fetchone()
        if not todo:
            return json({"error": "Todo not found"}, status=404)

        await db.execute("DELETE FROM todos WHERE id = ?", (todo_id,))
        await db.commit()
        return json({"message": f"Todo {todo_id} deleted successfully"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
