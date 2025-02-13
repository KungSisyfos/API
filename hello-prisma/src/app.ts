import express from "express";
import prisma from "./prisma"; // importing the prisma instance we created
import morgan from "morgan";

const app = express();
app.use(express.json());
app.use(morgan("dev"));

/**
 * GET /
 */
app.get("/", (req, res) => {
	res.send({
		message: "I AM API, BEEP BOOP",
	});
});

/**
 * GET /phones
 *
 * Get all phones
 */
app.get("/phones", async (req, res) => {

    try{
        const all_phones = await prisma.phones.findMany();
        res.send(all_phones);
    } catch (err) {
        console.log("Something went wrong");
    }

});

/**
 * GET /phones/:phoneId
 *
 * Get a single phone
 */
app.get("/phones/:phoneId", async (req, res) => {

    const phoneId = Number(req.params.phoneId);

    try {
        const phone = await prisma.phones.findUnique({
            where: {
                id: phoneId,
            },
        });

        if (!phone) {
            res.status(400).send({
                message: "Invalid User ID",
            });
            return;
        }

        res.send(phone);
    }catch (err) {
        console.log("Something went wrong");
    }
});


app.post("/phones", async (req, res) => {
    const { manufacturer, model, imei, user_id, } = req.body;
    const result = await prisma.phones.create({
        data: {
            manufacturer,
            model,
            imei,
            user_id,
        },
    });

    res.status(201).json(result);

});

/**
 * GET /users
 *
 * Get all users
 */
app.get("/users", async (req, res) => {

    try{
        const all_users = await prisma.users.findMany();

        res.send(all_users);
    } catch (err) {
        console.log("something went wrong")
    }
});

/**
 * GET /users/:userId
 *
 * Get a single user
 */
app.get("/users/:userId", async (req, res) => {
    const userId = Number(req.params.userId);


    try {
        const user = await prisma.users.findUnique({
            where: {
                id: userId,
            },
        });

        if (!user) {
            res.status(400).send({
                message: "Invalid User ID",
            });
            return;
        }

        res.send(user);
    }catch (err) {
        console.log(err);
    }


});

app.post("/users", async (req, res) => {
    const { name, title, email, phones} = req.body;
    const result = await prisma.users.create({
        data: {
            name,
            title,
            email,
            phones,
        },
    });

    res.status(201).json(result);

});




export default app;
