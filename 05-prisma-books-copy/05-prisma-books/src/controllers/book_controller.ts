/**
 * Book Controller
 */
import Debug from "debug";
import { Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";
import { handlePrismaError } from "../exceptions/prisma";
import { CreateBookData, UpdateBookData } from "../types/Book.types";
import prisma from "../prisma";

// Create a new debug instance
const debug = Debug("prisma-books:book_controller");

/**
 * Get all books
 *
 * GET /books
 */
export const index = async (req: Request, res: Response) => {
	try {
		const books = await prisma.book.findMany();
		res.send({ status: "success", data: books });

	} catch (err) {
		debug("Error when trying to query for all Books: %O", err);
		const { status_code, body } = handlePrismaError(err);
		res.status(status_code).send(body);
	}
}

/**
 * Get a single book
 *
 * GET /books/:bookId
 */
export const show = async (req: Request, res: Response) => {
	const bookId = Number(req.params.bookId);
	if (!bookId) {
		res.status(400).send({ status: "fail", data: { message: "That is not a valid ID" }});
		return;
	}

	try {
		const book = await prisma.book.findUniqueOrThrow({
			where: {
				id: bookId,
			},
			include: {
				authors: true,
				publisher: true,
			},
		});
		res.send({ status: "success", data: book });

	} catch (err) {
		debug("Error when trying to query for Book #%d: %O", bookId, err);
		const { status_code, body } = handlePrismaError(err);
		res.status(status_code).send(body);
	}
}

/**
 * Create a book
 *
 * POST /books
 */
export const store = async (req: Request, res: Response) => {
	// Check for any validation errors
	const validationErrors = validationResult(req);
	if (!validationErrors.isEmpty()) {
		res.status(400).send({
			status: "fail",
			data: validationErrors.array(),
		});
		return;
	}

	// Get only the validated data
	const validatedData: CreateBookData = matchedData(req);

	try {
		const book = await prisma.book.create({
			data: validatedData,
		});
		res.status(201).send({ status: "success", data: book });

	} catch (err) {
		debug("Error when trying to create a Book: %O", err);
		const { status_code, body } = handlePrismaError(err);
		res.status(status_code).send(body);
	}
}

/**
 * Update a book
 *
 * PATCH /books/:bookId
 */
export const update = async (req: Request, res: Response) => {
	const bookId = Number(req.params.bookId);
	if (!bookId) {
		res.status(400).send({ status: "fail", data: { message: "That is not a valid ID" }});
		return;
	}

	// Check for any validation errors
	const validationErrors = validationResult(req);
	if (!validationErrors.isEmpty()) {
		res.status(400).send({
			status: "fail",
			data: validationErrors.array(),
		});
		return;
	}

	// Get only the validated data
	const validatedData: UpdateBookData = matchedData(req);

	try {
		const book = await prisma.book.update({
			where: {
				id: bookId,
			},
			data: validatedData,
		});
		res.send({ status: "success", data: book });

	} catch (err) {
		debug("Error when trying to update Book #%d: %O", bookId, err);
		const { status_code, body } = handlePrismaError(err);
		res.status(status_code).send(body);
	}
}

/**
 * Delete a book
 *
 * DELETE /books/:bookId
 */
export const destroy = async (req: Request, res: Response) => {
	const bookId = Number(req.params.bookId);
	if (!bookId) {
		res.status(400).send({ status: "fail", data: { message: "That is not a valid ID" }});
		return;
	}

	try {
		await prisma.book.delete({
			where: {
				id: bookId,
			}
		});
		res.status(204).send();

	} catch (err) {
		debug("Error when trying to delete Book #%d: %O", bookId, err);
		const { status_code, body } = handlePrismaError(err);
		res.status(status_code).send(body);
	}
}

/**
 * Link book to author(s)
 *
 * POST /books/:bookId/authors
 */
export const addAuthor = async (req: Request, res: Response) => {
	const bookId = Number(req.params.bookId);
	if (!bookId) {
		res.status(400).send({ status: "fail", data: { message: "That is not a valid ID" }});
		return;
	}

	try {
		const book = await prisma.book.update({
			where: {
				id: bookId,
			},
			data: {
				authors: {
					connect: req.body,  // { "id": 8 }
				},
			},
			include: {
				authors: true,
			},
		});
		res.status(201).send({ status: "success", data: book });

	} catch (err) {
		debug("Error when trying to add Author %j to Book #%d: %O", req.body, bookId, err);
		const { status_code, body } = handlePrismaError(err);
		res.status(status_code).send(body);
	}
}

/**
 * Unlink an author from a book
 *
 * DELETE /books/:bookId/authors/:authorId
 */
export const removeAuthor = async (req: Request, res: Response) => {
	const bookId = Number(req.params.bookId);
	const authorId = Number(req.params.authorId);
	if (!bookId || !authorId) {
		res.status(400).send({ status: "fail", data: { message: "That is not a valid ID" }});
		return;
	}

	try {
		const book = await prisma.book.update({
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
		res.status(200).send({ status: "success", data: book });

	} catch (err) {
		debug("Error when trying to remove Author #%d from Book #%d: %O", authorId, bookId, err);
		const { status_code, body } = handlePrismaError(err);
		res.status(status_code).send(body);
	}
}
