import express from "express";
import prisma from "./prisma"; // importing the prisma instance we created
import morgan from "morgan";
import { PrismaClientInitializationError, PrismaClientKnownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/library";

const app = express();
app.use(express.json());
app.use(morgan("dev"));

const handlePrismaError = (err: unknown) => {
	if (err instanceof PrismaClientInitializationError) {
		return { status: 500, message: "Error initializing connection to database" };

	} else if (err instanceof PrismaClientKnownRequestError) {
		if (err.code === "P2021") {
			return { status: 500, message: "Database table does not exist" };

		} else if (err.code === "P2025") {
			return { status: 404, message: "Not Found" };
		}

	} else if (err instanceof PrismaClientValidationError) {
		return { status: 400, message: "Validation Error" };

	}

	return { status: 500, message: "Something went wrong when querying the database" };
}

/**
 * GET /
 */
app.get("/author", async (req, res) => {

    const authors = await prisma.author.findMany();

	res.send(authors);
});

app.get("/author/:authorId", async (req, res) => {

    const authorId = Number(req.params.authorId);

    if(!authorId) {
        res.status(400).send( {message: "oopsie"} );
        return;
    }

    try{
        const author = await prisma.author.findUniqueOrThrow({
            where: {
                id: authorId,
            },
            include: {
                book: true,
            },
        });

        res.send(author);



    } catch (err) {
        res.send(err);
    }
});

app.post("/author", async (req, res) => {
    const { name } = req.body;
    const result = await prisma.author.create({
        data: {
            name,
        }
    });
    res.status(201).send(result);
});

app.patch("/author/:authorId", async (req, res) => {
    const authorId = Number(req.params.authorId);
    const { id, name, books } = req.body;

    const result = await prisma.author.update({
        where: {
            id: authorId,
        },
        data: {
            id,
            name,
        },
    });
    res.status(200).send(result);

});

app.delete("author/:authorId", async (req, res) => {
    const authorId = Number(req.params.authorId);

    await prisma.author.delete({
        where: {
            id: authorId,
        },
    });
    res.status(204).send();
});


/**
 * Catch-all route handler
 */
app.use((req, res) => {
	// Respond with 404 and a message in JSON-format
	res.status(404).send({
		message: `Cannot ${req.method} ${req.path}`,
	});
});

export default app;
