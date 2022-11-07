import express, { Request, Response } from 'express';
import cors from 'cors';
import productsRouter from './domains/product/products.router';
import { errorHandler } from './common/error/error.handler';
import { httpLogger } from './common/middleware/common.middleware';
import * as swagger from "swagger-ui-express";
import * as swaggerJson from "./swagger/static/swagger.json";


const app = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(httpLogger);

  // swagger
  app.use('/docs', swagger.serve, swagger.setup(swaggerJson));

  app.use("/products", productsRouter());

  app.get("/ping", (req: Request, res: Response) => res.status(200).json({ message: "pong" }));

  app.use(errorHandler);

  return app;
}

export default app;