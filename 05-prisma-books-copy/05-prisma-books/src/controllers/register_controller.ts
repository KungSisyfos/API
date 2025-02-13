/**
 * Register Controller
 */
import bcrypt from "bcrypt";
import Debug from "debug";
import { Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";
import { handlePrismaError } from "../exceptions/prisma";
import { CreateUserData } from "../types/User.types";
import prisma from "../prisma";

// Create a new debug instance
const debug = Debug("prisma-books:register_controller");

// Get environment variables
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10;

/**
 * Register a new user
 *
 * POST /register
 */
export const register = async (req: Request, res: Response) => {
	// Validate incoming data
	const validationErrors = validationResult(req);
	if (!validationErrors.isEmpty()) {
		res.status(400).send({
			status: "fail",
			data: validationErrors.array(),
		});
		return;
	}

	// Get only the validated data from the request
	const validatedData: CreateUserData = matchedData(req);
	debug("validatedData: %O", validatedData);

	// Calculate a hash + salt for the password
	const hashed_password = await bcrypt.hash(validatedData.password, SALT_ROUNDS);
	debug("plaintext password:", validatedData.password);
	debug("hashed password:", hashed_password);

	// Create the user in the database
	try {
		// plz computah, create user, mkai?
		const user = await prisma.user.create({
			data: {
				name: validatedData.name,
				email: validatedData.email,
				password: hashed_password,
			},
		});

		// Respond with 201 Created + status success
		res.status(201).send({ status: "success", data: user });

	} catch (err) {
		debug("Error when trying to create User %o: %O", validatedData, err);
		const { status_code, body } = handlePrismaError(err);
		res.status(status_code).send(body);
	}
}
