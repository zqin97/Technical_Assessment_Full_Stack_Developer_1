import { Request, Response, NextFunction } from 'express';
import {getAllItems} from "../services/item.service";

export const getAllItemsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const items = await getAllItems();
    res.status(200).json(items);
  } catch (err) {
    next(err);
  }
}