import {Router} from "express";
import {getAllItemsController} from "../controllers/item.controller";

const router = Router();

router.get('/', getAllItemsController)

export default router;