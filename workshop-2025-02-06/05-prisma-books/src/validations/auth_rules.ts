/**
 * Validation Rules for Authentication
 */
import { body } from "express-validator";

export const loginRules = [
	// email required, string, valid email, unique
	body("email")
		.trim().isEmail().withMessage("email has to be a valid email (duh)"),

	// password required, string, at least 6 chars
	body("password")
		.isString().withMessage("password has to be a string"),
];
