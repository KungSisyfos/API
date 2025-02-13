import express from "express";
import { addBooks, getBooks, getProfile, removeBook, updateProfile } from "../controllers/profile_controller";
import { updateUserRules } from "../validations/user_rules";

// Create a new Profile router
const router = express.Router();

/**
 * GET /profile
 *
 * Get the authenticated user's profile
 */
router.get("/", getProfile);

/**
 * PATCH /profile
 *
 * Update the authenticated user's profile
 */
router.patch("/", updateUserRules, updateProfile);

/**
 * GET /profile/books
 *
 * Get the authenticated user's books
 */
router.get("/books", getBooks);

/**
 * POST /profile/books
 *
 * Link books to authenticated user
 */
router.post("/books", addBooks);

/**
 * DELETE /profile/books/:bookId
 *
 * Unlink book from authenticated user
 */
router.delete("/books/:bookId", removeBook);

export default router;
