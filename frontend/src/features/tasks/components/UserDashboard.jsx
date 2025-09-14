import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import useAuthStore from "../../../lib/zustand/authStore";
import { getTasks, createTask, updateTask, deleteTask } from "../service";
import AddTaskModal from "./AddTaskModal";
import EditTaskModal from "./EditTaskModel";
import api from "@/lib/axios";
import LogoutButton from "@/components/common/LogoutButton";

export default function Dashboard() {
  const { user, updateUser } = useAuthStore();
  const [tasks, setTasks] = useState([]);
  const [showAddTask, setShowAddTask] = useState(false);
  const [showEditTask, setShowEditTask] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTasks();

    updateUser().catch(console.error);
  }, []);

  const handleAddTask = async (task) => {
    const newTask = await createTask(task);
    setTasks([newTask, ...tasks]);
  };

  const handleUpdateTask = async (id, updates) => {
    const updated = await updateTask(id, updates);
    setTasks(tasks.map(t => t.id === id ? updated : t));
  };

  const handleDeleteTask = async (id) => {
    await deleteTask(id);
    setTasks(tasks.filter(t => t.id !== id));
  };

  const handleEditClick = (task) => {
    setSelectedTask(task);
    setShowEditTask(true);
  };

  const handleEditSubmit = async (updates) => {
    await handleUpdateTask(selectedTask.id, updates);
    setShowEditTask(false);
    setSelectedTask(null);
  };

  const handleSubmit = async () => {
    console.log("here");
    
    if(!user?.isPaid && tasks?.length == 10){
        const response =  await api.get('/payments/create-checkout-session');
        const {success, data} = response?.data;
        console.log("success, data",success, data,"response",response);
        
        if (success && data) {
             window.location.href = data;
        }
    }else{
        setShowAddTask(true);
    }
  }
  

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>
        <div className="flex gap-2">
            <Button onClick={handleSubmit}>
          {user?.isPaid || tasks.length < 10 ? "+ Add Task" : "Subscribe"}
        </Button>
        <LogoutButton/>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <Card key={task.id} className="p-4 hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <CardTitle>{task.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{task.description || "No description"}</p>
              <p>Status: {task.completed ? "✅ Completed" : "⏳ Pending"}</p>

              <div className="flex gap-2 mt-2">
                {/* Toggle status */}
                <Button
                  onClick={() => handleUpdateTask(task.id, { completed: !task.completed })}
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  {task.completed ? "Mark Pending" : "Mark Completed"}
                </Button>

                {/* Edit task */}
                <Button
                  onClick={() => handleEditClick(task)}
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                  Edit
                </Button>

                {/* Delete task */}
                <Button
                  onClick={() => handleDeleteTask(task.id)}
                  className="bg-red-500 hover:bg-red-600 text-white"
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <AddTaskModal
        isOpen={showAddTask}
        onClose={() => setShowAddTask(false)}
        onTaskCreated={handleAddTask}
      />

      <EditTaskModal
        isOpen={showEditTask}
        onClose={() => setShowEditTask(false)}
        task={selectedTask}
        onTaskUpdated={handleEditSubmit}
      />
    </div>
  );
}
