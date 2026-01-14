import * as express from 'express';
import { router } from "./userRouter";

export const app = express();

const jsonParser = express.json();
app.use(jsonParser);

app.use('/api/users', router);