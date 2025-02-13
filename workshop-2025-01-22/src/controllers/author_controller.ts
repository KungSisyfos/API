import Debug from "debug";
import prisma from "../prisma";
import { handlePrismaError } from "../exceptions/prisma_error";
import { Request, Response } from "express"

const debug = Debug("workshop-2025-01-22:author_controller");
/***
 * 
 * Get all author
 */

export const index = async (req: Request, res: Response) => {
    try {
        const result = await prisma.author.findMany();
        res.status(200).send(result);

    }catch(err){
        debug("Error when trying to query for all Authors: %O", err);
        const { status, message } = handlePrismaError(err);
        res.status(status).send({ message });
    }
}

export const show = async (req: Request, res: Response) => {
    const authorId = Number(req.params.authorId);
    try {
            const result = await prisma.author.findUniqueOrThrow({
            where: {
                id: authorId,
            },
            include: {
                book: true,
            },
        });
        res.status(200).send(result);
    } catch (err) {
        debug("Error when trying to query for Author with ID %d: %O", authorId, err);
        const { status, message } = handlePrismaError(err);
        res.status(status).send( {message} );
    }
}

export const store = async (req: Request, res: Response) => {
    try {
        const result = await prisma.author.create({
            data: req.body,
        });
        res.send(result);
    } catch (err) {
        debug("Error when trying to create a Author: %O", err);
        const { status, message } = handlePrismaError(err);
        res.status(status).send({ message });
    }
}

export const update = async (req: Request, res: Response) => {
    const authorId = Number(req.params.authorId);
    if(!authorId){
        res.status(500).send({ message: "This is not a vaild ID" });
        return;
    }
    try {
        const result = await prisma.author.update({
            where: {
                id: authorId,
            },
            data: req.body,
        });
        res.status(200).send(result);
    } catch (err) {
        debug("Error when trying to update Author with ID %d: %O", authorId, err);
        const { status, message } = handlePrismaError(err);
        res.status(status).send({ message });
    }
}

export const destroy = async (req: Request, res: Response) => {
    const authorId = Number(req.params.authorId);
    if(!authorId){
        res.status(500).send({ message: "This is not a vaild ID" });
        return;
    }
    try {
        await prisma.author.delete({
            where: {
                id: authorId,
            },
        });
        res.status(204).send();
    } catch (err) {
        debug("Error when trying to delete Author with ID %d: %O", authorId, err);
        const { status, message } = handlePrismaError(err);
        res.status(status).send({ message });
    }
}

