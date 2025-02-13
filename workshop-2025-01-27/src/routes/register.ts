import express from "express";
import { body } from "express-validator";
import { index, show, store, update, destroy, addBook } from "../controllers/register_controller";

// Create a new Resource router
const router = express.Router();

/**
 * GET /resources
 *
 * Get all resources
 */
router.get("/", index);

/**
 * GET /resources/:resourceId
 *
 * Get a single resource
 */
router.get("/:userId", show);

/**
 * POST /resources
 *
 * Create a resource
 */
router.post("/",[
    body("name")
        .isString().withMessage("has to be a string").bail()
        .trim().isLength({ min: 3, max: 191 }).withMessage("has to be 3-191 chars long"),
],store);

/**
 * PATCH /resources/:resourceId
 *
 * Update a resource
 */
router.patch("/:userId", update);

/**
 * DELETE /resources/:resourceId
 *
 * Delete a resource
 */
router.delete("/:userId", destroy);

router.post("/:userId/:book", addBook);

export default router;