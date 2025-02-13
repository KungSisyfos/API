/**
 * Book Service
 */
import prisma from "../prisma";
import { AuthorId } from "../types/Author.types";
import { CreateBookData, UpdateBookData } from "../types/Book.types";

/**
 * Get all books
 */
export const getBooks = () => {
	return prisma.book.findMany();
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

export const addAuthorToBook = async (bookId: number, authorIdOrIds: AuthorId | AuthorId[]) => {
	prisma.book.update({
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

export const removeAuthorFromBook = (bookId: number, authorId: number) => {
    prisma.book.update({
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

