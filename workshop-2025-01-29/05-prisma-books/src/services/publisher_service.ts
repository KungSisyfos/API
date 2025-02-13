/**
 * Publisher Service
 */
import prisma from "../prisma";
import { CreatePublisherData, UpdatePublisherData } from "../types/Publisher.types";

/**
 * Get all publishers
 */
export const getPublishers = () => {
	return prisma.publisher.findMany();
}

/**
 * Get a single publisher
 *
 * @param publisherId The ID of the Publisher to get
 */
export const getPublisher = (publisherId: number) => {
	return prisma.publisher.findUniqueOrThrow({
		where: {
			id: publisherId,
		},
		include: {
			books: true,
		},
	});
}

/**
 * Create an publisher
 *
 * @param data Publisher data
 */
export const createPublisher = async (data: CreatePublisherData) => {
	return prisma.publisher.create({
		data,
	});
}

/**
 * Update an publisher
 *
 * @param publisherId The ID of the Publisher to update
 * @param data Publisher data
 * @returns
 */
export const updatePublisher = async (publisherId: number, data: UpdatePublisherData) => {
	return prisma.publisher.update({
		where: {
			id: publisherId,
		},
		data,
	});
}

/**
 * Delete an publisher
 *
 * @param publisherId The ID of the Publisher to delete
 */
export const deletePublisher = async (publisherId: number) => {
	return prisma.publisher.delete({
		where: {
			id: publisherId,
		}
	});
}