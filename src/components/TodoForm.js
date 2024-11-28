import React, { useEffect, useState } from "react";
import { createTodo, getTodoById, updateTodo } from "../api/todoApi";
import { useNavigate, useParams } from "react-router-dom";

const TodoForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending",
    priority: false,
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodo = async () => {
      if (id) {
        const response = await getTodoById(id);
        setFormData(response.data.data);
      }
    };

    fetchTodo(); // Fetch the ToDo on component mount
  }, [id]); // Dependency array includes 'id'

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await updateTodo(id, formData);
    } else {
      await createTodo(formData);
    }
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="d-flex align-items-center">
        <label className="me-3">Priority:</label>
        <i
          className={`bi bi-star${formData.priority ? "-fill" : ""}`}
          style={{
            fontSize: "2rem", // Default size
            color: formData.priority ? "gold" : "gray", // Gold if active, gray otherwise
            cursor: "pointer",
            animation: formData.priority ? "pop 0.3s ease-in-out" : undefined, // Pop effect on click
          }}
          onClick={() =>
            setFormData({ ...formData, priority: !formData.priority })
          }
        ></i>

        <style>
          {`
      @keyframes pop {
        0% {
          transform: scale(1); /* Start at default size */
          color: white; /* Bright flash */
        }
        50% {
          transform: scale(1.5); /* Grow slightly */
          color: gold; /* Transition to gold */
        }
        100% {
          transform: scale(1); /* Back to default size */
          color: gold; /* Final color */
        }
      }
    `}
        </style>
      </div>

      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          type="text"
          className="form-control"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          className="form-control"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
      </div>
      {id ? (
        <div className="form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            id="completed"
            checked={formData.status === "completed"}
            onChange={(e) =>
              setFormData({
                ...formData,
                status: e.target.checked ? "completed" : "pending",
              })
            }
          />
          <label className="form-check-label" htmlFor="completed">
            Completed
          </label>
        </div>
      ) : null}
      <button className="btn btn-primary" type="submit">
        {id ? "Update" : "Add"} ToDo
      </button>
    </form>
  );
};

export default TodoForm;
