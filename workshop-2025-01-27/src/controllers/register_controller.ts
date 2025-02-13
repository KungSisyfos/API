/**
 * Resource Controller
 */
import Debug from "debug";
import { Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";
import { handlePrismaError } from "../exceptions/prisma";
import prisma from "../prisma";

const debug = Debug("workshop-2025-01-27:register_controller");

/**
 * Get all resources
 *
 * GET /resources
 */
export const index = async (req: Request, res: Response) => {
    try {
        const result = await prisma.user.findMany();
        res.send({status:"success", data: result});
    } catch (err) {
        res.status(404).send()
    }
    

}

/**
 * Get a single resource
 *
 * GET /resources/:resourceId
 */
export const show = async (req: Request, res: Response) => {
    const userId = Number(req.params.user);
    if(!userId){
        res.status(400).send({ status: "fail", data: { message: "That is not a valid ID" }});
		return;
    }
    try{
        const result = await prisma.user.findUniqueOrThrow({
            where: {
                id: userId,
            },
            include: {
                book: true,
            },
        });
    } catch (err) {
        debug("Error when trying to query for Author #%d: %O", userId, err);
        const { status_code, body } = handlePrismaError(err);
        res.status(status_code).send(body);
    }
}

/**
 * Create a resource
 *
 * POST /resources
 */
export const store = async (req: Request, res: Response) => {
    try {
        const result = await prisma.user.create({
            data: req.body
        });
        res.status(201).send({ status: "success", data: result });
        
    } catch (err) {
        debug("Error when creating a user %0", err);
        const { status_code, body } = handlePrismaError(err);
        res.status(status_code).send(body);   
    }
}

/**
 * Update a resource
 *
 * PATCH /resources/:resourceId
 */
export const update = async (req: Request, res: Response) => {
    const userId = Number(req.params.user);
    if(!userId){
        res.status(400).send({status: "fail", data: { message: "Id is invalid" }});
        return;
    }
    try {
        const result = await prisma.user.update({
            where: {
                id: userId,
            }, 
            data: req.body,
        });
        res.status(200).send({ status: "success", data: result });
        
    } catch (err) {
        debug("Error when updating a user #%d: %O", err);
        const { status_code, body } = handlePrismaError(err);
        res.status(status_code).send(body);
        
    }
            
}

/**
 * Delete a resource
 *
 * DELETE /resources/:resourceId
 */
export const destroy = async (req: Request, res: Response) => {
    const userId = Number(req.params.user);
    try {
        await prisma.user.delete({
            where: {
                id: userId,
            },
        });
        res.status(204).send();
    } catch (err) {
        debug("Error when removing a user", err);
        const { status_code, body} = handlePrismaError(err);
        res.status(status_code).send(body);  
    }
}

export const addBook = async (req: Request, res: Response) => {
    const userId = Number(req.params.user);
    if(!userId){
        res.status(400).send({ status: "fail", data: { message: "That is not a valid ID" }});
    }
    try {
        const result = await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                book: {
                    connect: req.body,
                },
            },
        });
        res.status(200).send({ status: "success", data: result}); 
    } catch (err) {
        debug("Error when trying to add Author %j to Book #%d: %O", req.body, userId, err);
        const { status_code, body } = handlePrismaError(err);
        res.status(status_code).send(body);
        
    }
}
