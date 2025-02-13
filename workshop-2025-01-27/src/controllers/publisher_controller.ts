/**
 * Publisher Controller
 */
import Debug from "debug";
import { Request, Response } from "express";
import { handlePrismaError } from "../exceptions/prisma";
import prisma from "../prisma";

// Create a new debug instance
const debug = Debug("workshop-2025-01-27:publisher_controller");

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
				book: true,
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
	try {
		const publisher = await prisma.publisher.create({
			data: req.body,
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

	try {
		const publisher = await prisma.publisher.update({
			where: {
				id: publisherId,
			},
			data: req.body,
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
