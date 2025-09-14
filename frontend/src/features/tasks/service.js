// src/features/tasks/services/taskService.js
import api from "../../lib/axios"

// Fetch all tasks
export const getTasks = async () => {
  try {
    const res = await api.get("/tasks");
    return res.data.data;
  } catch (err) {
    console.error("Failed to fetch tasks:", err);
    throw err;
  }
};

// Create a new task
export const createTask = async (task) => {
  try {
    const res = await api.post("/tasks", task);
    return res.data.data;
  } catch (err) {
    console.error("Failed to create task:", err);
    throw err;
  }
};

// Update task by ID
export const updateTask = async (id, updates) => {
  try {
    const res = await api.put(`/tasks/${id}`, updates);
    return res.data.data;
  } catch (err) {
    console.error("Failed to update task:", err);
    throw err;
  }
};

// Delete task by ID
export const deleteTask = async (id) => {
  try {
    const res = await api.delete(`/tasks/${id}`);
    return res.data.message;
  } catch (err) {
    console.error("Failed to delete task:", err);
    throw err;
  }
};
