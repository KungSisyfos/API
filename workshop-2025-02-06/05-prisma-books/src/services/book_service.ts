/**
 * Book Service
 */
import { AuthorId } from "../types/Author.types";
import { CreateBookData, UpdateBookData } from "../types/Book.types";
import prisma from "../prisma";

/**
 * Get all books
 */
export const getBooks = () => {
	return prisma.book.findMany();
}

/**
 * Get all Books owned by the specified User
 *
 * @param userId Owner
 */
export const getBooksByUserId = (userId: number) => {
	return prisma.book.findMany({
		where: {
			ownedBy: {
				some: {
					id: userId,
				},
			},
		},
	});
}

/**
 * Get a single book
 *
 * @param bookId The ID of the Book to get
 */
export const getBook = (bookId: number) => {
	return prisma.book.findUniqueOrThrow({
		where: {
			id: bookId,
		},
		include: {
			authors: true,
			publisher: true,
		},
	});
}

/**
 * Create an book
 *
 * @param data Book data
 */
export const createBook = async (data: CreateBookData) => {
	return prisma.book.create({
		data,
	});
}

/**
 * Update an book
 *
 * @param bookId The ID of the Book to update
 * @param data Book data
 * @returns
 */
export const updateBook = async (bookId: number, data: UpdateBookData) => {
	return prisma.book.update({
		where: {
			id: bookId,
		},
		data,
	});
}

/**
 * Delete an book
 *
 * @param bookId The ID of the Book to delete
 */
export const deleteBook = async (bookId: number) => {
	return prisma.book.delete({
		where: {
			id: bookId,
		}
	});
}

/**
 * Link author(s) to book
 *
 * @param bookId The ID of the Book
 * @param authorIdOrIds The ID(s) of the Author(s)
 */
export const addAuthorToBook = async (bookId: number, authorIdOrIds: AuthorId | AuthorId[]) => {
	return prisma.book.update({
		where: {
			id: bookId,
		},
		data: {
			authors: {
				connect: authorIdOrIds,  // { "id": 8 }
			},
		},
		include: {
			authors: true,
		},
	});
}

/**
 * Unlink author from book
 *
 * @param bookId
 * @param authorId
 * @returns
 */
export const removeAuthorFromBook = async (bookId: number, authorId: number) => {
	return prisma.book.update({
		where: {
			id: bookId,
		},
		data: {
			authors: {
				disconnect: {
					id: authorId,
				},
			},
		},
		include: {
			authors: true,
		},
	});
}
