import express from "express";
import { body } from "express-validator";
import { index, show, store, update, destroy, addAuthor, removeAuthor } from "../controllers/book_controller";

// Create a new Book router
const router = express.Router();

/**
 * GET /books
 *
 * Get all books
 */
router.get("/", index);

/**
 * GET /books/:bookId
 *
 * Get a single book
 */
router.get("/:bookId", show);

/**
 * POST /books
 *
 * Create a book
 */
router.post("/", [
    body("title")
        .isString().withMessage("has to be a string").bail()
        .trim().isLength({ min: 3, max: 191 }).withMessage("has to be 3-191 chars long"),

    body("publisher")
        .optional()
        .isString().withMessage("has to be a string").bail()
        .trim().isLength({ min: 3, max: 191}).withMessage("has to be 3-191 chars long"),
], store);

/**
 * PATCH /books/:bookId
 *
 * Update a book
 */
router.patch("/:bookId", [
	body("title")
		.optional()
		.isString().withMessage("has to be a string").bail()
		.isLength({ min: 3, max: 191 }).withMessage("has to be 3-191 chars long"),
	body("publisher")
        .isString().withMessage("has to be a string").bail()
        .isLength({ min: 3, max: 191 }).withMessage("has to be 3-191 chars long"),
    body("pages")
		.optional()
		.isInt().withMessage("has to be a integer"),
], update);

/**
 * DELETE /books/:bookId
 *
 * Delete a book
 */
router.delete("/:bookId", destroy);

/**
 * POST /books/:bookId/authors
 *
 * Link book to author(s)
 */
router.post("/:bookId/authors", addAuthor);

/**
 * DELETE /books/:bookId/authors/:authorId
 *
 * Unlink an author from a book
 */
router.delete("/:bookId/authors/:authorId", removeAuthor);

export default router;
