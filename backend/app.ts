import "reflect-metadata";
import express, { Express } from "express";
import cors from "cors";
import helmet from "helmet";
import AppDataSource from "./typeorm.config";
import { useExpressServer } from "routing-controllers";
import { ItemController } from "./modules/item/item.controller";
import { CustomErrorHandler } from "./middlewares/custom-error-handler.middleware";

const app: Express = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize TypeORM
AppDataSource.initialize()
  .then((datasource) => {
    console.log("Connected to the database");

    useExpressServer(app, {
      routePrefix: "/api",
      controllers: [ItemController],
      middlewares: [CustomErrorHandler],
      defaultErrorHandler: false,
    });

    // Start server
    app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
  })
  .catch((error) => console.log("TypeORM connection error: ", error));
