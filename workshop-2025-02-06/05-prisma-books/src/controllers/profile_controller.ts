/**
 * Profile Controller
 */
import bcrypt from 'bcrypt';
import Debug from "debug";
import { Request, Response } from "express";
import { handlePrismaError } from "../exceptions/prisma";
import { getBooksByUserId } from "../services/book_service";
import { addBooksToUser, removeBookFromUser, updateUser } from "../services/user_service";
import { matchedData, validationResult } from "express-validator";
import { UpdateUserData } from "../types/User.types";

// Create a new debug instance
const debug = Debug("prisma-books:profile_controller");

// Get environment variables
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10;

/**
 * Get the authenticated user's profile
 *
 * GET /profile
 */
export const getProfile = async (req: Request, res: Response) => {
	// If someone ever removes authentication from the route for this method, yell at them
	if (!req.user) {
		throw new Error("Trying to access authenticated user but none exists. Did you remove authentication from this route? 🤬🤬🤬");
	}

	// Respond with User 🪪
	res.send({
		status: "success",
		data: {
			id: req.user.id,
			name: req.user.name,
			email: req.user.email,
		},
	});
}

/**
 * Update the authenticated user's profile
 *
 * PATCH /profile
 */
export const updateProfile = async (req: Request, res: Response) => {
	// If someone ever removes authentication from the route for this method, yell at them
	if (!req.user) {
		throw new Error("Trying to access authenticated user but none exists. Did you remove authentication from this route? 🤬🤬🤬");
	}

	const userId = req.user.id;

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
	const validatedData: UpdateUserData = matchedData(req);

	if (validatedData.password) {
		// Calculate a hash + salt for the password
		validatedData.password = await bcrypt.hash(validatedData.password, SALT_ROUNDS);
	}

	try {
		// update user
		const user = await updateUser(userId, validatedData);

		res.send({
			status: "success",
			data: user,
		});

	} catch (err) {
		debug("Error when trying to update authenticated user %d: %O", userId, err);
		const { status_code, body } = handlePrismaError(err);
		res.status(status_code).send(body);
	}
}

/**
 * Get the authenticated user's books
 *
 * GET /profile/books
 */
export const getBooks = async (req: Request, res: Response) => {
	// If someone ever removes authentication from the route for this method, yell at them
	if (!req.user) {
		throw new Error("Trying to access authenticated user but none exists. Did you remove authentication from this route? 🤬🤬🤬");
	}

	const userId = req.user.id;

	try {
		const books = await getBooksByUserId(userId);

		res.send({
			status: "success",
			data: books,
		});

	} catch (err) {
		debug("Error when trying to get authenticated user %d Books: %O", userId, err);
		const { status_code, body } = handlePrismaError(err);
		res.status(status_code).send(body);
	}
}

/**
 * Link books to the authenticated user
 *
 * POST /profile/books
 */
export const addBooks = async (req: Request, res: Response) => {
	// If someone ever removes authentication from the route for this method, yell at them
	if (!req.user) {
		throw new Error("Trying to access authenticated user but none exists. Did you remove authentication from this route? 🤬🤬🤬");
	}

	const userId = req.user.id;

	try {
		const books = await addBooksToUser(userId, req.body);

		res.status(201).send({
			status: "success",
			data: books,
		});

	} catch (err) {
		debug("Error when trying to link Books %o to authenticated user %d", req.body, userId, err);
		const { status_code, body } = handlePrismaError(err);
		res.status(status_code).send(body);
	}
}

/**
 * Unlink book from the authenticated user
 *
 * DELETE /profile/books/:bookId
 */
export const removeBook = async (req: Request, res: Response) => {
	// If someone ever removes authentication from the route for this method, yell at them
	if (!req.user) {
		throw new Error("Trying to access authenticated user but none exists. Did you remove authentication from this route? 🤬🤬🤬");
	}

	const bookId = Number(req.params.bookId);
	const userId = req.user.id;

	if (!bookId) {
		res.status(400).send({ status: "fail", data: { message: "That is not a valid ID" }});
		return;
	}

	try {
		// remove book
		await removeBookFromUser(userId, bookId);

		res.status(204).send();

	} catch (err) {
		debug("Error when trying to unlink Book %d from authenticated user %d", req.body, userId, err);
		const { status_code, body } = handlePrismaError(err);
		res.status(status_code).send(body);
	}
}
