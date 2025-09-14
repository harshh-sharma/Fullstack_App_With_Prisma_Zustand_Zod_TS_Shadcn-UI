import prisma from "../../prisma";
import { ITaskCreate, ITaskUpdate } from "./task.type";

export const createTask = async (data: ITaskCreate) => {
  console.log("data",data);
  
   const user = await prisma.user.findUnique({ where: { id: data.userId }, include: { tasks: true } });
  console.log("userr",user);
  
  if (!user) throw new Error("User not found");

  // Check free limit
  if (!user.isPaid && user.tasks.length >= 10) {
    throw new Error("Free limit reached. Please subscribe to create more tasks.");
  }

  return prisma.task.create({ data });
}

export const getTasks = async ({userId}: {userId: string}) => {
    return prisma.task.findMany({
        where:{userId},
        orderBy: { createdAt: "desc" },
    })
}

export const updateTaskById = async ({ taskId, data }: { taskId: string, data: ITaskUpdate }) => {
    return prisma.task.update({
        where: { id: taskId },
        data: data
    });
};

export const deleteTask = async ({ taskId }: { taskId: string }) => {
  try {
    return await prisma.task.delete({
      where: { id: taskId },
    });
  } catch (error) {
    throw new Error("Task not found or could not be deleted");
  }
};


export const deleteAllTask = async ({ userId}:{ userId: string}) => {
    return prisma.task.deleteMany({where: {userId}})
};

export const getTaskById = ({taskId}:{taskId:string}) => {
    return prisma.task.delete({where:{id: taskId}});
}

export const updateTaskStatusById = async ({ taskId }: { taskId: string }) => {
    return prisma.task.update({
        where: { id: taskId },
        data:{
          completed:true
        }
    });
};

export const getAllTasks = async () => {
    const tasks = await prisma.task.findMany({
  include: { user: true }, // <-- include user object
});
return tasks
};

