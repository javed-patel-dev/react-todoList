import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTodos, deleteTodo } from "../api/todoApi";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await getTodos(); // Make API call
      console.log("response from todos", response.data.data.todos);
      setTodos(response.data.data.todos); // Update state with API data
      console.log(todos);
    } catch (error) {
      console.error("Error fetching todos:", error);
      setTodos([]); // Fallback to empty array in case of error
    }
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
    fetchTodos(); // Refresh the list
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 text-center">
          <button
            className="btn btn-primary mb-3"
            onClick={() => navigate("/add")}
          >
            Add ToDo
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 table-responsive mt-4">
          <table className="table table-bordered table-striped table-hover">
            <thead className="table-dark text-center">
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((todo) => (
                <tr
                  key={todo._id}
                  className={todo.status === "completed" ? "table-success" : ""}
                >
                  <td className="text-capitalize">{todo.title}</td>
                  <td>{todo.description}</td>
                  <td className="text-center">
                    <span
                      className={`badge ${
                        todo.status === "completed"
                          ? "bg-success"
                          : "bg-secondary"
                      }`}
                    >
                      {todo.status}
                    </span>
                  </td>
                  <td className="text-center">
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => navigate(`/edit/${todo._id}`)}
                    >
                      <i className="bi bi-pencil"></i> Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(todo._id)}
                    >
                      <i className="bi bi-trash"></i> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
