import { Request, Response } from "express";
import { DetailCategoriesService } from "../../services/categories/DetailCategoriesService";

class DetailCategoriesController {
  async handle(req: Request, res: Response) {
    const detailCategory = new DetailCategoriesService();

    const categories = await detailCategory.execute();

    return res.json(categories);
  }
}

export { DetailCategoriesController };
