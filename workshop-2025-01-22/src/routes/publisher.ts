import express from "express";
import { index, show, store, update, destroy, linkBook } from "../controllers/publisher_controller";

const router = express.Router();

router.get("/", index);
router.get("/:publisherId", show);
router.post("/", store);
router.patch("/:publisherId", update);
router.delete("/:publisherId", destroy);
router.post("/:publisherId/book", linkBook);

export default router;