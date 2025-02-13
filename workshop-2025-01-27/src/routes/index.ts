import express from "express";
import authorRouter from "./author";
import bookRouter from "./book";
import publisherRouter from "./publisher";
import registerRouter from "./register";

// Create a new Root router
const router = express.Router();

/**
 * GET /
 */
router.get("/", (req, res) => {
	res.send({
		status: "success",
		data: {
			message: "I AM BOOK API, LOREM IPSUM",
		}
	});
});

// Author routes
router.use("/authors", authorRouter);

// Book routes
router.use("/books", bookRouter);

// Publisher routes
router.use("/publishers", publisherRouter);


// User routes
router.use("/users", registerRouter);

/**
 * Catch-all route handler
 */
router.use((req, res) => {
	// Respond with 404 and a message in JSON-format
	res.status(404).send({
		status: "fail",
		data: {
			message: `Cannot ${req.method} ${req.path}`,
		}
	});
});

export default router;
