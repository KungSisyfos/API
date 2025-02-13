/**
 * Profile Controller
 */
import { Request, Response } from "express";
import { handlePrismaError } from "../exceptions/prisma";
import Debug from "debug";

/**
 * Get the authenticated user's profile
 *
 * GET /profile
 */
export const getProfile = async (req: Request, res: Response) => {

	const authenticatedUser = req.body;
	if(!authenticatedUser) {
		throw new Error("Trying to access authenticated user but none exist. Did you remove authentication form this route???");
	}
	res.send({
		status: "success",
		data:{ 
			id: authenticatedUser.id,
			name: authenticatedUser.name,
			email: authenticatedUser.email
		},
	});
}

/**
 * Get the authenticated user's books
 *
 * GET /profile/books
 */
export const getBooks = async (req: Request, res: Response) => {
	res.send({
		status: "success",
		data: null,
	});
}

/**
 * Update the authenticated user's profile
 *
 * PATCH /profile
 */
export const updateProfile = async (req: Request, res: Response) => {
	res.status(501).send({
		status: "success",
		data: null,
	});
}
