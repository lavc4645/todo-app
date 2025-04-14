import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/todos";

function App() {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    const res = await axios.get(API_URL);
    setTodos(res.data);
  };

  const toggleDone = async (id, done) => {
    await axios.put(`${API_URL}/${id}`, { done: !done });
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>✅ Todo List</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id} style={{ marginBottom: "1rem" }}>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => toggleDone(todo._id, todo.done)}
            />
            <span
              style={{
                marginLeft: "0.5rem",
                textDecoration: todo.done ? "line-through" : "none",
              }}
            >
              {todo.title}
            </span>
            <button
              onClick={() => deleteTodo(todo._id)}
              style={{ marginLeft: "1rem" }}
            >
              🗑 Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
