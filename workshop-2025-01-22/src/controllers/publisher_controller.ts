import Debug from "debug"
import prisma from "../prisma";
import { handlePrismaError } from "../exceptions/prisma_error";
import { Request, Response } from "express"

const debug = Debug("workshop-2025-01-22:publisher_controller")
/***
 * 
 * Get all Publisher
 */

export const index = async (req: Request, res: Response) => {
    try {
        const result = await prisma.publisher.findMany();
        res.status(200).send(result);

    }catch(err){
        
        const { status, message } = handlePrismaError(err);
        res.status(status).send({ message });
    }
}

export const show = async (req: Request, res: Response) => {
    const publisherId = Number(req.params.publisherId);
    try {
            const result = await prisma.publisher.findUniqueOrThrow({
            where: {
                id: publisherId,
            },
            include: {
                books: true,
            },
        });
        res.status(200).send(result);
    } catch (err) {
        const { status, message } = handlePrismaError(err);
        res.status(status).send( {message} );
    }
}

export const store = async (req: Request, res: Response) => {
    try {
        const result = await prisma.publisher.create({
            data: req.body,
        });
        res.send(result);
    } catch (err) {
        const { status, message } = handlePrismaError(err);
        res.status(status).send({ message });
    }
}

export const update = async (req: Request, res: Response) => {
    const publisherId = Number(req.params.publisherId);
    if(!publisherId){
        res.status(500).send({ message: "This is not a vaild ID" });
        return;
    }
    try {
        const result = await prisma.publisher.update({
            where: {
                id: publisherId,
            },
            data: req.body,
        });
        res.status(200).send(result);
    } catch (err) {
        const { status, message } = handlePrismaError(err);
        res.status(status).send({ message });
    }
}

export const destroy = async (req: Request, res: Response) => {
    const publisherId = Number(req.params.publisherId);
    if(!publisherId){
        res.status(500).send({ message: "This is not a vaild ID" });
        return;
    }
    try {
        await prisma.publisher.delete({
            where: {
                id: publisherId,
            },
        });
        res.status(204).send();
    } catch (err) {
        debug("Error when trying to delete Author with ID %d: %O", publisherId, err);
        const { status, message } = handlePrismaError(err);
        res.status(status).send({ message });
    }
}

export const linkBook = async (req: Request, res: Response) => {

    const publisherId = Number(req.params.publisherId);


    try{
        const result = await prisma.publisher.update({
            where: {
                id: publisherId,
            },
            data: {
                books: {
                    connect: req.body,
                },    
            },
            include: {
                books: true,
            }
        });
        res.status(202).send(result);
    }catch(err){
        const { status, message } = handlePrismaError(err);
        res.status(status).send({ message });
    }
}