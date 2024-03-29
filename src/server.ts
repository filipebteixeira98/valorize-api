import 'reflect-metadata';
import 'express-async-errors';
import express, { Request, Response, NextFunction } from 'express';

import './database';

import { router } from './routes';

const app = express();

app.use(express.json());

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
      return response.status(400).json({ error: err.message });
    }

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error!',
    });
  }
);

app.listen(3333, () => {
  console.log('🚀 Server is running at http://localhost:3333');
});
