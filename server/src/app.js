import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import userRoutes from "../src/routes/user.route.js";

const app = express();

app.use(
  cors({
    origin: "*",
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", userRoutes);

export default app;
