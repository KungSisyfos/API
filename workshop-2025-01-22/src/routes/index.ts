import express from "express";
import authorRouter from "./author";
import bookRouter from "./books";
import publisherRouter from "./publisher";

// Create a new Root router
const router = express.Router();

/**
 * GET /
 */
router.get("/", (req, res) => {
	res.send({
		message: "I AM BOOK API",
	});
});

// Author routes
router.use("/authors", authorRouter);

// Book routes
router.use("/books", bookRouter);

// Publisher routes
router.use("/publisher", publisherRouter)

/**
 * Catch-all route handler
 */
router.use((req, res) => {
	// Respond with 404 and a message in JSON-format
	res.status(404).send({
		message: `Cannot ${req.method} ${req.path}`,
	});
});

export default router;
