import React, { useState, useEffect } from "react";
import { Button } from "../../../components/ui/button";
import {
  getAllUsers,
  updateUserByAdmin,
  deleteUserByAdmin,
  getAllTasks,
  updateTaskByAdmin,
  deleteTaskByAdmin,
} from "../service";
import EditUserModal from "../components/EditUserModel";
import EditTaskModal from "../components/EditTaskModel";
import LogoutButton from "@/components/common/LogoutButton";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setUsers(await getAllUsers());
    setTasks(await getAllTasks());
  };

  const handleUserUpdate = async (updates) => {
    await updateUserByAdmin(selectedUser.id, updates);
    fetchData();
  };

  const handleTaskUpdate = async (updates) => {
    await updateTaskByAdmin(selectedTask.id, updates);
    fetchData();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <LogoutButton/>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Users</h2>
        <table className="w-full border">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Paid</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((u) => (
              <tr key={u.id}>
                <td>{u?.name}</td>
                <td>{u?.email}</td>
                <td>{u?.role}</td>
                <td>{u?.isPaid ? "Yes" : "No"}</td>
                <td className="flex gap-2">
                  <Button
                    onClick={() => {
                      setSelectedUser(u);
                      setIsUserModalOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={async () => {
                      await deleteUserByAdmin(u.id);
                      fetchData();
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Tasks</h2>
        <table className="w-full border">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>User</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks?.map((t) => (
              <tr key={t.id}>
                <td>{t.title}</td>
                <td>{t.description}</td>
                <td>{t.user.name}</td>
                <td>{t.completed ? "Completed" : "Pending"}</td>
                <td className="flex gap-2">
                  <Button
                    onClick={() => {
                      setSelectedTask(t);
                      setIsTaskModalOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={async () => {
                      await deleteTaskByAdmin(t.id);
                      fetchData();
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <EditUserModal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        user={selectedUser}
        onUserUpdated={handleUserUpdate}
      />

      <EditTaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        task={selectedTask}
        onTaskUpdated={handleTaskUpdate}
      />
    </div>
  );
};

export default AdminDashboard;
