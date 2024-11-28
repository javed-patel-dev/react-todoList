import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import 'bootstrap-icons/font/bootstrap-icons.css'; // Bootstrap Icons (optional)

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";

function App() {
  return (
    <Router>
      <div className="container mt-5">
        <h1 className="text-center">ToDo List</h1>
        <Routes>
          <Route path="/" element={<TodoList />} />
          <Route path="/add" element={<TodoForm />} />
          <Route path="/edit/:id" element={<TodoForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
