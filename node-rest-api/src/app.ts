import express, { Request, Response } from 'express';
import cors from 'cors';
import * as expressWinston from 'express-winston';
import productsRouter from './domains/product/products.router';
import { errorLogger, errorHandler } from './common/error/error.handler';
import loggerOptions from './common/logging/express.logger.options';


const app = () => {
  const app = express();
  
  app.use(express.json());
  app.use(cors());;
  app.use(expressWinston.logger(loggerOptions));
  
  // routes
  app.use("/products", productsRouter());
  
  // ping route for debug
  app.get("/ping", (req: Request, res: Response) => res.status(200).json({ message: "pong" }));
  
  // error handling middleware
  app.use(errorLogger);
  app.use(errorHandler);
  
  return app;
}

export default app;