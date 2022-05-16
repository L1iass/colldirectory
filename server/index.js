import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";

import userRouter from "./routes/user.js";
import collRouter from "./routes/coll.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/users", userRouter);
app.use("/coll", collRouter);
app.get("/", (req, res) => {
  res.send("Welcome to collection API");
});

const port = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
