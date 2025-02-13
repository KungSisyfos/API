/**
 * Resource Controller
 */
import { Request, Response } from "express";
import { handlePrismaError } from "../exceptions/prisma";
import prisma from "../prisma";

/**
 * Get all resources
 *
 * GET /resources
 */
export const index = async (req: Request, res: Response) => {
}

/**
 * Get a single resource
 *
 * GET /resources/:resourceId
 */
export const show = async (req: Request, res: Response) => {
}

/**
 * Create a resource
 *
 * POST /resources
 */
export const store = async (req: Request, res: Response) => {
}

/**
 * Update a resource
 *
 * PATCH /resources/:resourceId
 */
export const update = async (req: Request, res: Response) => {
}

/**
 * Delete a resource
 *
 * DELETE /resources/:resourceId
 */
export const destroy = async (req: Request, res: Response) => {
}
