import {Request, Response} from "express";
import * as UserService from "./user.service";

export const registerUser = async (req: Request, res: Response) => {
    try {
        const user = await UserService.register(req.body);
        console.log("user",user);
        
        return res.status(201).json({
            success: true,
            message:"user successfully registered",
            data: user
        });
    } catch (error: any) {
         res.status(400).json({ error: error.message });
    }
}

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await UserService.getAllUser();
        return res.status(200).json({
            success:true,
            message:"successfully get users",
            data:users
        })
    } catch (error:any) {
        return res.status(400).json({
            success:false,
            message:error?.message
        })
    }
}

export const loginUser = async (req: Request, res: Response) => {
    try {
        const {user, token} = await UserService.login(req.body);
        
        return res.status(200).json({
            success:true,
            message:'User successfully loggedIn',
            data: {user, token}
        })
    } catch (error: any) {
         return res.status(400).json({
            success:false,
            message:error?.message
        })
    }
}

export const getUserInfo = async (req: Request, res: Response) => {
  try {
    const {userId} = (req as any).user; // cast to any
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await UserService.getUser({ userId: userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
   
    return res.status(200).json({
      success: true,
      message: "User info successfully fetched",
      data: user,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const {userId} = (req as any).user; // cast to any
    const {id} = req.params;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await UserService.updateUser(id,req.body);
   
    return res.status(200).json({
      success: true,
      message: "User info successfully updated",
      data: user,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    });
  }
};

