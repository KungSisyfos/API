import cors from "cors";
import express from "express";
import morgan from "morgan";
import rootRouter from "./routes/index";

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Use dem routes
app.use(rootRouter);

export default app;
