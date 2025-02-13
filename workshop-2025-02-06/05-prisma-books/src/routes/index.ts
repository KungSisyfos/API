import express from "express";
import { login, refresh, register } from "../controllers/auth_controller";
import { validateAccessToken } from "../middlewares/auth/jwt";
import { createUserRules } from "../validations/user_rules";
import authorRouter from "./author";
import bookRouter from "./book";
import profileRouter from "./profile";
import { loginRules } from "../validations/auth_rules";
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

/**
 * Resource routes
 */
router.use("/authors", authorRouter);
router.use("/books", bookRouter);
router.use("/profile", validateAccessToken, profileRouter);
router.use("/publishers", publisherRouter);

/**
 * Log in a user
 *
 * POST /login
 */
router.post("/login", loginRules, login);
/**
 * Refresh authentication
 *
 * POST /refresh
 */
router.post("/refresh", refresh);

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
