import express from "express";
import { register } from "../controllers/register_controller";
import { basic } from "../middlewares/auth/basic";
import { createUserRules } from "../validations/user_rules";
import authorRouter from "./author";
import bookRouter from "./book";
import profileRouter from "./profile";
import publisherRouter from "./publisher";

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

// Profile routes
router.use("/profile", basic, profileRouter);

// Publisher routes
router.use("/publishers", publisherRouter);

/**
 * Register a new user
 *
 * POST /register
 */
router.post("/register", createUserRules, register);

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
