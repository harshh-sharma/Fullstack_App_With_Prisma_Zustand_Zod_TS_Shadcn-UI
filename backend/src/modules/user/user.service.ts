import {Request, Response} from "express";
import { createUserInput, getUserSchema, loginUserInput } from "./user.types";
import prisma from "../../prisma";
import bcrypt from "bcrypt";
import { error } from "console";
import jwt from "jsonwebtoken";

export const register = async (data: createUserInput) => {
      const existingUser = await prisma.user.findUnique({ where: { email: data.email } });
  if (existingUser) {
    throw new Error("Email already registered");
  }
    const hasedPassword = await bcrypt.hash(data.password, 10);
        const user = await prisma.user.create({
            data:{
                name: data?.name,
                email: data?.email,
                password: hasedPassword
            }
        })
        return user;
}

export const login = async (data: loginUserInput) => {
    const user = await prisma.user.findUnique({where : {email: data?.email}});
    if(!user) throw new Error('No user found');
    const isPasswordCorrect = await bcrypt.compare(data?.password, user.password);
    if(!isPasswordCorrect) throw new Error('Invalid Password');

      const token = jwt.sign({ userId: user.id, role:user.role }, process.env.JWT_SECRET || "secret", {
    expiresIn: "1d",
  });

  return { token , user}

}

export const getUser = async ({userId}: {userId:  string}) => {
    const user = await prisma.user.findUnique({
      where: { id: userId},
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        isPaid: true,
        role: true,
      },
    });

    return user;
}

export const getAllUser = async () => {
        const users = await prisma.user.findMany();
        return users;
}

export const updateUser = async (id: string, data: any) => {
  console.log("data",data,"id",id);
  
  const user = await prisma.user.update({
    where: { id },
    data
  });
  return user;
};
