import express from "express";
import { getBooks, getProfile, updateProfile } from "../controllers/profile_controller";

// Create a new Profile router
const router = express.Router();

/**
 * GET /profile
 *
 * Get the authenticated user's profile
 */
router.get("/", getProfile);

/**
 * GET /profile/books
 *
 * Get the authenticated user's books
 */
router.get("/books", getBooks);

/**
 * PATCH /profile
 *
 * Update the authenticated user's profile
 */
router.patch("/", updateProfile);

export default router;
