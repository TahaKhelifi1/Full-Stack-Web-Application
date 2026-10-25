import { Router } from "express";
import * as service from "../services/categoryService.js";

export const categoriesRouter = Router();

categoriesRouter.get("/", async (_req, res) => {
  const categories = await service.listCategories();
  res.json(categories);
});
