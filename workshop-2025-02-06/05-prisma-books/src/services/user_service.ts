/**
 * User Service
 */
import { CreateUserData, UpdateUserData } from "../types/User.types";
import prisma from "../prisma";
import { BookId } from "../types/Book.types";

/**
 * Get a User by email
 *
 * @param email Email of user to get
 */
export const getUserByEmail = (email: string) => {
	return prisma.user.findUnique({
		where: {
			email,
		},
	});
}

export const getUserById = (id: number) => {
	return prisma.user.findUnique({
		where: {
			id,
		}
	})
}

/**
 * Create a user
 *
 * @param data User data
 */
export const createUser = (data: CreateUserData) => {
	return prisma.user.create({
		data,
	});
}

/**
 * Update a user
 *
 * @param data User data
 */
export const updateUser = (userId: number, data: UpdateUserData) => {
	return prisma.user.update({
		where: {
			id: userId,
		},
		data,
	});
}

/**
 * Get a User's Books
 *
 * @param userId ID of User
 */
export const getUserBooks = async (userId: number) => {
	const user = await prisma.user.findUniqueOrThrow({
		select: {
			books: true,
		},
		where: {
			id: userId,
		},
		// include: {
		// 	books: true,
		// },
	});

	return user.books;
}

/**
 * Add Book(s) to User
 *
 * @param userId ID of User
 * @param bookIdOrBookIds Book ID(s) to link
 */
export const addBooksToUser = async (userId: number, bookIdOrBookIds: BookId | BookId[]) => {
	const user = await prisma.user.update({
		select: {
			books: true,
		},
		where: {
			id: userId,
		},
		data: {
			books: {
				connect: bookIdOrBookIds,
			},
		},
	});

	return user.books;
}

/**
 * Remove Book from User
 *
 * @param userId User ID
 * @param bookId Book ID to remove
 */
export const removeBookFromUser = async (userId: number, bookId: number) => {
	const user = await prisma.user.update({
		select: {
			books: true,
		},
		where: {
			id: userId,
		},
		data: {
			books: {
				disconnect: {
					id: bookId,
				},
			},
		},
	});

	return user.books;
}
