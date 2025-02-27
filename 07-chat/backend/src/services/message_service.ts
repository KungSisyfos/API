import { Message } from "@shared/types/Models.types";
import prisma from "../prisma";

export const createMessage = (data: Message) => {
	return prisma.message.create({
		data,
	});
}