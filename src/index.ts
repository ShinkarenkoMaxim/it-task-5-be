// Setup environment
import * as dotenv from 'dotenv';
dotenv.config({ path: `${__dirname}/../.env` });

import express, { Request, Response } from 'express';
import apiRoutes from './routes';

const app = express();

app.use(express.static('public'));

app.use('/api', apiRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server has been started at ${process.env.PORT}`);
});
