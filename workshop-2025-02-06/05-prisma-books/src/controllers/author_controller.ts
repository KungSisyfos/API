/**
 * Author Controller
 */
import Debug from "debug";
import { Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";
import { handlePrismaError } from "../exceptions/prisma";
import { createAuthor, deleteAuthor, getAuthor, getAuthors, updateAuthor } from "../services/author_service";
import { CreateAuthorData, UpdateAuthorData } from "../types/Author.types";

// Create a new debug instance
const debug = Debug("prisma-books:author_controller");

/**
 * Get all authors
 *
 * GET /authors
 */
export const index = async (req: Request, res: Response) => {
	try {
		const authors = await getAuthors();
		res.send({ status: "success", data: authors });

	} catch (err) {
		debug("Error when trying to query for all Authors: %O", err);
		const { status_code, body } = handlePrismaError(err);
		res.status(status_code).send(body);
	}
}

/**
 * Get a single author
 *
 * GET /authors/:authorId
 */
export const show = async (req: Request, res: Response) => {
	const authorId = Number(req.params.authorId);
	if (!authorId) {
		res.status(400).send({ status: "fail", data: { message: "That is not a valid ID" }});
		return;
	}

	try {
		const author = await getAuthor(authorId);
		res.send({ status: "success", data: author });

	} catch (err) {
		debug("Error when trying to query for Author #%d: %O", authorId, err);
		const { status_code, body } = handlePrismaError(err);
		res.status(status_code).send(body);
	}
}

/**
 * Create a author
 *
 * POST /authors
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
	const validatedData: CreateAuthorData = matchedData(req);

	try {
		const author = await createAuthor(validatedData);
		res.status(201).send({ status: "success", data: author });

	} catch (err) {
		debug("Error when trying to create a Author: %O", err);
		const { status_code, body } = handlePrismaError(err);
		res.status(status_code).send(body);
	}
}

/**
 * Update a author
 *
 * PATCH /authors/:authorId
 */
export const update = async (req: Request, res: Response) => {
	const authorId = Number(req.params.authorId);
	if (!authorId) {
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
	const validatedData: UpdateAuthorData = matchedData(req);

	try {
		const author = await updateAuthor(authorId, validatedData);
		res.send({ status: "success", data: author });

	} catch (err) {
		debug("Error when trying to update Author #%d: %O", authorId, err);
		const { status_code, body } = handlePrismaError(err);
		res.status(status_code).send(body);
	}
}

/**
 * Delete a author
 *
 * DELETE /authors/:authorId
 */
export const destroy = async (req: Request, res: Response) => {
	const authorId = Number(req.params.authorId);
	if (!authorId) {
		res.status(400).send({ status: "fail", data: { message: "That is not a valid ID" }});
		return;
	}

	try {
		await deleteAuthor(authorId);
		res.status(204).send();

	} catch (err) {
		debug("Error when trying to delete Author #%d: %O", authorId, err);
		const { status_code, body } = handlePrismaError(err);
		res.status(status_code).send(body);
	}
}
