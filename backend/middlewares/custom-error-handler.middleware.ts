import {
  Middleware,
  ExpressErrorMiddlewareInterface,
} from "routing-controllers";
import { ValidationError } from "class-validator";
import { Request, Response, NextFunction } from "express";

interface CustomErrorOptions {
  httpCode: number;
  message: string;
  title?: string;
  appErrorCode?: string;
  errors?: Array<ValidationError>;
}

export class CustomError extends Error {
  httpCode: number;
  appErrorCode?: string;
  title?: string;
  errors?: Array<ValidationError>;

  constructor(options: CustomErrorOptions) {
    super(options.message);
    this.httpCode = options.httpCode;
    this.title = options.title;
    this.appErrorCode = options.appErrorCode;
    this.errors = options.errors;
  }
}

@Middleware({ type: "after" })
export class CustomErrorHandler implements ExpressErrorMiddlewareInterface {
  error(error: CustomError, req: Request, res: Response, next: NextFunction) {
    console.error(error.stack);
    if (
      Array.isArray(error.errors) &&
      error.errors[0] instanceof ValidationError
    ) {
      const formattedErrors = error.errors
        .map((err: ValidationError) => {
          return Object.values(err.constraints || {});
        })
        .flat();
      res.status(400).send({
        code: error.httpCode,
        message: error.message,
        errors: formattedErrors,
      });
    } else if (error.appErrorCode) {
      res.status(error.httpCode).send({
        code: error.httpCode,
        app_error_code: error.appErrorCode,
        message: error.message,
      });
    } else {
      res.status(error.httpCode).send({
        code: 500,
        title: "INTERNAL_SERVER_ERROR",
        message: "An unexpected error occurred: " + error.message,
      });
    }
  }
}
