# 📝 Full Stack Todo App – React + Sanic (Python)

A modern full-stack Todo application with a Kanban-style frontend built using **React + Shadcn UI** and a backend powered by **Sanic (Python async framework)** with **SQLite** as the database.

---

## 🚀 Features

- Create, edit, delete, and move tasks across **Pending**, **In Progress**, and **Completed** columns.
- **Drag and drop** tasks like GitLab-style boards.
- Fully async Python backend with RESTful APIs.
- Realtime-like UI with smooth transitions and toast notifications.

---

## 🐍 Backend Setup

### ✅ Python Version
This project uses **Python 3.10+**

### ✅ Create Virtual Environment

```bash
# Step 1: Create virtual environment
python -m venv venv

# Step 2: Activate virtual environment
# On Windows
venv\Scripts\activate
# On macOS/Linux
source venv/bin/activate
```

### ✅ Install Dependencies

```bash
pip install -r requirements.txt
```

### ✅ Start Backend Server

```bash
python main.py
```

- The backend will start on: `http://localhost:8000`
- Test it with: `GET http://localhost:8000/ping` → Should return `{ "message": "pong" }`

---

## 🗃️ SQLite Configuration

The app uses a local `todos.db` file. No additional setup required — it auto-generates on first run.

If you'd like to reset your DB manually:

```bash
rm todos.db  # On Linux/macOS
del todos.db # On Windows
```

---

## 🌐 Frontend Setup

### ✅ Prerequisites

- Node.js v18+

### ✅ Install Dependencies

```bash
npm install
```

### ✅ Start React App

```bash
npm run dev
```

- The app will be available at: `http://localhost:5173`

> ⚠️ Make sure the backend is also running on `http://localhost:8000` — this is configured in the frontend API URLs.

---

## 📁 Project Structure

```
todo-backend/
├── main.py
├── todos.db
├── requirements.txt

todo-frontend/
├── src/
│   └── components/
│       └── TodoList.tsx
├── index.html
├── tailwind.config.js
├── package.json
```

---

## ✅ Notes

- Avoid committing `venv/`, `__pycache__/`, or `node_modules/`.
- CORS is already configured to allow frontend requests from `localhost:5173`.
- Errors are displayed via toasts in the frontend.

---

## 💡 Future Improvements

- Add user authentication
- Use WebSocket for real-time task updates
- Deploy with Docker or on Render/Vercel

---

## Credits

This project was originally based on [React Frontend Boilerplate](https://github.com/Kgaurav729/canary-frontend-boilerplate) and [React Backend Boilerplate](https://github.com/Kgaurav729/canary-backend-boilerplate)by [Dev Sanghani](https://github.com/dsanghan) , used under the [MIT License](https://opensource.org/licenses/MIT).

Happy coding! 🎯

