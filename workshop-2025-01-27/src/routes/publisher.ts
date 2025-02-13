import express from "express";
import { body } from "express-validator";
import { index, show, store, update, destroy } from "../controllers/publisher_controller";

// Create a new Publisher router
const router = express.Router();

/**
 * GET /publishers
 *
 * Get all publishers
 */
router.get("/", index);

/**
 * GET /publishers/:publisherId
 *
 * Get a single publisher
 */
router.get("/:publisherId", show);

/**
 * POST /publishers
 *
 * Create a publisher
 */
router.post("/", store);

/**
 * PATCH /publishers/:publisherId
 *
 * Update a publisher
 */
router.patch("/:publisherId", [
    body("name")
        .optional()
        .isString().withMessage("has to be a string").bail()
        .isLength({ min: 3, max: 191 }).withMessage("has to be 3-191 chars long"),
], update);

/**
 * DELETE /publishers/:publisherId
 *
 * Delete a publisher
 */
router.delete("/:publisherId", destroy);

export default router;
