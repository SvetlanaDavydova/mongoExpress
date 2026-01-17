import express from "express";
import { router } from "./userRouter.js";
import dotenv from "dotenv";
export const app = express();

dotenv.config();

const jsonParser = express.json();
app.use(jsonParser);

app.use('/api/users', router);