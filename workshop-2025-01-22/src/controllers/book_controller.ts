import Debug from "debug";
import prisma from "../prisma";
import { handlePrismaError } from "../exceptions/prisma_error";
import { Request, Response } from "express"

const debug = Debug("workshop-2025-01-22:book_controller")

export const index = async (req: Request, res: Response) => {
    try {
        const result = await prisma.book.findMany();
        res.status(200).send(result);

    }catch(err){
        debug("Error 0%", err);
        const { status, message } = handlePrismaError(err);
        res.status(status).send({ message });
    }
}

export const show = async (req: Request, res: Response) => {
    const bookId = Number(req.params.bookId);
    try {
            const result = await prisma.book.findUniqueOrThrow({
            where: {
                id: bookId,
            },
            include: {
                author: true,
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
        const result = await prisma.book.create({
            data: req.body,
        });
        res.send(result);
    } catch (err) {
        const { status, message } = handlePrismaError(err);
        res.status(status).send({ message });
    }
}

export const update = async (req: Request, res: Response) => {
    const bookId = Number(req.params.bookId);
    if(!bookId){
        res.status(500).send({ message: "This is not a vaild ID" });
        return;
    }
    try {
        const result = await prisma.book.update({
            where: {
                id: bookId,
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
    const bookId = Number(req.params.bookId);
    if(!bookId){
        res.status(500).send({ message: "This is not a vaild ID" });
        return;
    }
    try {
        await prisma.book.delete({
            where: {
                id: bookId,
            },
        });
        res.status(204).send();
    } catch (err) {
        const { status, message } = handlePrismaError(err);
        res.status(status).send({ message });
    }
}

export const addAuthor = async (req: Request, res: Response) => {
	const bookId = Number(req.params.bookId);
	if (!bookId) {
		res.status(400).send({ message: "That is not a valid ID" });
		return;
	}

	try {
		const book = await prisma.book.update({
			where: {
				id: bookId,
			},
			data: {
				author: {
					connect: req.body,  // { "id": 8 }
				},
			},
			include: {
				author: true,
			},
		});
		res.status(201).send(book);

	} catch (err) {
		console.error(err);
		const { status, message } = handlePrismaError(err);
		res.status(status).send({ message });
	}
}

export const removeAuthor = async (req: Request, res: Response) => {
	const bookId = Number(req.params.bookId);
	const authorId = Number(req.params.authorId);
	if (!bookId || !bookId) {
		res.status(400).send({ message: "That is not a valid ID" });
		return;
	}

	try {
		const book = await prisma.book.update({
			where: {
				id: bookId,
			},
			data: {
				author: {
					disconnect: {
						id: authorId,
					},
				},
			},
			include: {
				author: true,
			},
		});
		res.status(200).send(book);

	} catch (err) {
		console.error(err);
		const { status, message } = handlePrismaError(err);
		res.status(status).send({ message });
	}
}
