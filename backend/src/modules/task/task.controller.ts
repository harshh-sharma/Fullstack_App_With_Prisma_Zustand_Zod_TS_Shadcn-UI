import {Request, Response} from "express";
import * as TaskService from "./task.service";

export const createTask = async (req:Request , res: Response ) => {
    try {
        console.log("user",(req as any).user);
        
         const {userId} = (req as any).user;  
        const task = await TaskService.createTask({userId,...req.body});

        return res.status(200).json({
            success:true,
            message:"successfully created task",
            data:task
        })
    } catch (error: any) {
        return res.status(400).json({
            success:false,
            message:error?.message
        })
    }
}

export const getTasks = async (req:Request, res:Response) => {
    try {
          const {userId} = (req as any).user;
          const tasks = await TaskService.getTasks({userId});
          return res.status(200).json({
            success:true,
            message:"Successfully get tasks",
            data:tasks
          })
    } catch (error:any) {
         return res.status(400).json({
            success:false,
            message:error?.message
        })
    }
}

export const updateTaskById = async (req:Request, res:Response) => {
    try {
        const {id} = req.params;
        const updatedData =  {
            ...req.body,
            completed: Boolean(req.body.completed)
        }
        const task = await TaskService.updateTaskById({taskId:id, data:updatedData});
        return res.status(200).json({
            success:true,
            message:"Successfully task updated",
            data:task
          })
    } catch (error:any) {
         return res.status(400).json({
            success:false,
            message:error?.message
        })
    }
}

export const deleteTaskById = async (req:Request, res:Response) => {
    try {
        const {id} = req.params;
        const task = await TaskService.deleteTask({taskId:id});
        return res.status(200).json({
            success:true,
            message:"Successfully task deleted"
          })
    } catch (error:any) {
         return res.status(400).json({
            success:false,
            message:error?.message
        })
    }
}

export const deleteAllTaskRelatedToUser = async (req:Request, res:Response) => {
    try {
         const {id} = (req as any).user;
        const task = await TaskService.deleteAllTask({userId:id});
        return res.status(200).json({
            success:true,
            message:"Successfull deleted all tasks"
          })
    } catch (error:any) {
         return res.status(400).json({
            success:false,
            message:error?.message
        })
    }
}

export const getSpecificTask = async (req:Request, res:Response) => {
    try {
        const {id} = req.params;
        const task = await TaskService.getTaskById({taskId:id});
        return res.status(200).json({
            success:true,
            message:"Successfull get task",
            data:task
          })
    } catch (error:any) {
         return res.status(400).json({
            success:false,
            message:error?.message
        })
    }
}

export const updateTaskStatus = async (req:Request, res:Response) => {
    try {
        const {id} = req.params;
        const updatedData =  {
            completed: Boolean(req.body.completed)
        }
        const task = await TaskService.updateTaskStatusById({taskId:id});
        return res.status(200).json({
            success:true,
            message:"Successfully task updated",
            data:task
          })
    } catch (error:any) {
         return res.status(400).json({
            success:false,
            message:error?.message
        })
    }
}

export const getAllTasks = async (req: Request, res: Response) => {
    try {
        const tasks = await TaskService.getAllTasks();
        return res.status(200).json({
            success:true,
            message:"Successfully get all tasks",
            data:tasks
          })
    } catch (error:any) {
         return res.status(400).json({
            success:false,
            message:error?.message
        })
    }
}