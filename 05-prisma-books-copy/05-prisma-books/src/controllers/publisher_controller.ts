/**
 * Publisher Controller
 */
import Debug from "debug";
import { Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";
import { handlePrismaError } from "../exceptions/prisma";
import { CreatePublisherData, UpdatePublisherData } from "../types/Publisher.types";
import prisma from "../prisma";

// Create a new debug instance
const debug = Debug("prisma-books:publisher_controller");

/**
 * Get all publishers
 *
 * GET /publishers
 */
export const index = async (req: Request, res: Response) => {
	try {
		const publishers = await prisma.publisher.findMany();
		res.send({ status: "success", data: publishers });

	} catch (err) {
		debug("Error when trying to query for all Publishers: %O", err);
		const { status_code, body } = handlePrismaError(err);
		res.status(status_code).send(body);
	}
}

/**
 * Get a single publisher
 *
 * GET /publishers/:publisherId
 */
export const show = async (req: Request, res: Response) => {
	const publisherId = Number(req.params.publisherId);
	if (!publisherId) {
		res.status(400).send({ status: "fail", data: { message: "That is not a valid ID" }});
		return;
	}

	try {
		const publisher = await prisma.publisher.findUniqueOrThrow({
			where: {
				id: publisherId,
			},
			include: {
				books: true,
			},
		});
		res.send({ status: "success", data: publisher });

	} catch (err) {
		debug("Error when trying to query for Publisher #%d: %O", publisherId, err);
		const { status_code, body } = handlePrismaError(err);
		res.status(status_code).send(body);
	}
}

/**
 * Create a publisher
 *
 * POST /publishers
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
	const validatedData: CreatePublisherData = matchedData(req);

	try {
		const publisher = await prisma.publisher.create({
			data: validatedData,
		});
		res.status(201).send({ status: "success", data: publisher });

	} catch (err) {
		debug("Error when trying to create a Publisher: %O", err);
		const { status_code, body } = handlePrismaError(err);
		res.status(status_code).send(body);
	}
}

/**
 * Update a publisher
 *
 * PATCH /publishers/:publisherId
 */
export const update = async (req: Request, res: Response) => {
	const publisherId = Number(req.params.publisherId);
	if (!publisherId) {
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
	const validatedData: UpdatePublisherData = matchedData(req);

	try {
		const publisher = await prisma.publisher.update({
			where: {
				id: publisherId,
			},
			data: validatedData,
		});
		res.send({ status: "success", data: publisher });

	} catch (err) {
		debug("Error when trying to update Publisher #%d: %O", publisherId, err);
		const { status_code, body } = handlePrismaError(err);
		res.status(status_code).send(body);
	}
}

/**
 * Delete a publisher
 *
 * DELETE /publishers/:publisherId
 */
export const destroy = async (req: Request, res: Response) => {
	const publisherId = Number(req.params.publisherId);
	if (!publisherId) {
		res.status(400).send({ status: "fail", data: { message: "That is not a valid ID" }});
		return;
	}

	try {
		await prisma.publisher.delete({
			where: {
				id: publisherId,
			}
		});
		res.status(204).send();

	} catch (err) {
		debug("Error when trying to delete Publisher #%d: %O", publisherId, err);
		const { status_code, body } = handlePrismaError(err);
		res.status(status_code).send(body);
	}
}
