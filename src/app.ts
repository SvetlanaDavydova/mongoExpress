
import express from "express";
import { router } from "./userRouter.js";

export const app = express();
console.log()

const jsonParser = express.json();
app.use(jsonParser);

app.use('/api/users', router);