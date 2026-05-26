import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import userRoutes from "../src/routes/user.route.js";
import repoRoutes from "./routes/repo.route.js";
import issueRoutes from "./routes/issue.route.js";

const app = express();

app.use(
  cors({
    origin: "*",
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoutes);
app.use("/repo", repoRoutes);
app.use("/issue", issueRoutes);

//Active Check
app.use("/", (req, res) => {
  res.send("Server is running.....");
});

export default app;
