/**
 * User Service
 */
import prisma from "../prisma";
import { CreateUserData } from "../types/User.types";



export const getUserByEmail = async (email: string) => {
	return await prisma.user.findUnique({
		where: {
			email,
		},
	});
}


export const createUser = (data: CreateUserData) =>{
	return prisma.user.create({
		data,
	})
}