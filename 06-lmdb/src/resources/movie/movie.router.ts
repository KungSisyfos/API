import express from "express";
import * as movieController from "./movie.controller";
const router = express.Router();

/**
 * GET /movies
 */
router.get("/", movieController.index);

/**
 * GET /movies/:movieId
 */
router.get("/:movieId", movieController.show);

router.post("/", movieController.store);

router.patch("/:movieId", movieController.update);

router.delete("/:movieId", movieController.destroy);

export default router;
