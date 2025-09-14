import api from "../../lib/axios"

// Users
export const getAllUsers = async () => {
  const res = await api.get("/users");
  return res.data.data;
};

export const updateUserByAdmin = async (id, updates) => {
  console.log("id",id,"updates",updates)
  const res = await api.put(`/users/${id}`, updates);
  return res.data.data;
};

export const deleteUserByAdmin = async (id) => {
  const res = await api.delete(`/users/${id}`);
  return res.data.message;
};

// Tasks
export const getAllTasks = async () => {
  const res = await api.get("/tasks/admin/");
  return res.data.data;
};

export const updateTaskByAdmin = async (id, updates) => {
  const res = await api.put(`/tasks/${id}`, updates); // your middleware handles admin access
  return res.data.data;
};

export const deleteTaskByAdmin = async (id) => {
  const res = await api.delete(`/tasks/${id}`);
  return res.data.message;
};
