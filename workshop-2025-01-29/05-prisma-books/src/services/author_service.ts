/**
 * Author Service
 */
import prisma from "../prisma";
import { CreateAuthorData, UpdateAuthorData } from "../types/Author.types";

/**
 * Get all authors
 */
export const getAuthors = () => {
	return prisma.author.findMany();
}

/**
 * Get a single author
 *
 * @param authorId The ID of the Author to get
 */
export const getAuthor = (authorId: number) => {
	return prisma.author.findUniqueOrThrow({
		where: {
			id: authorId,
		},
		include: {
			books: true,
		},
	});
}

/**
 * Create an author
 *
 * @param data Author data
 */
export const createAuthor = async (data: CreateAuthorData) => {
	return prisma.author.create({
		data,
	});
}

/**
 * Update an author
 *
 * @param authorId The ID of the Author to update
 * @param data Author data
 * @returns
 */
export const updateAuthor = async (authorId: number, data: UpdateAuthorData) => {
	return prisma.author.update({
		where: {
			id: authorId,
		},
		data,
	});
}

/**
 * Delete an author
 *
 * @param authorId The ID of the Author to delete
 */
export const deleteAuthor = async (authorId: number) => {
	return prisma.author.delete({
		where: {
			id: authorId,
		}
	});
}
