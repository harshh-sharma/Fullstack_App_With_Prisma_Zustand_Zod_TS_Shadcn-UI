import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import jwt from "jsonwebtoken";
import prisma from "../prisma";

export const validateRequest = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ errors: result.error.issues });
    }
    req.body = result.data; // sanitized data
    next();
  };
};

interface JwtPayload {
  user: string;
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  
  const authHeader = req.headers.authorization;
  console.log("authHeader",authHeader);
  
  

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret") as JwtPayload;
    (req as any).user  = decoded;  // attach userId to request
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};

export const isAdmin = async (req:Request, res:Response, next:NextFunction) => {
  try {
        console.log("req.user",(req as any).user);
    const {role, id} =( req as any).user;

    
    if(role !== 'ADMIN'){
      return res.status(400).json({
        success:false,
        message:"Unauthorized access"
      })
    }
    next();
  } catch (error:any) {
    return res.status(401).json({ error: error?.message });
  }
}


// For tasks: owner or admin can update/delete
export const isOwnerOrAdmin = async (req: Request & { user?: any }, res: Response, next: NextFunction) => {
  const {userId} = req.user;
  const task = await prisma.task.findUnique({ where: { id: req.params.id } });
  if (!task) return res.status(404).json({ message: "Task not found" });

  if (req.user.role !== "ADMIN" && task.userId !== userId) {
    return res.status(403).json({ message: "Not allowed" });
  }
  next();
};
