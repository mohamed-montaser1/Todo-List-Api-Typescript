import express, { Express } from "express";
import { config } from "dotenv";
import ToDoRoute from "./routes/crud/index";
import authRouter from "./routes/auth";

import { connect } from "mongoose";
config();

const app: Express = express();
const port = process.env.PORT || 3002;

app.use(express.json());
app.use("/api/crud", ToDoRoute);
app.use("/api/auth", authRouter);

connect(process.env.DB_URL).then(() => console.log("DB Connected!"));

app.listen(port, () =>
  console.log(`Listen on Port ${port}, url = http://localhost:${port}/api`)
);
