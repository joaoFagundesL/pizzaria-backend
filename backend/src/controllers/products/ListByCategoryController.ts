import { Request, Response } from "express";
import { ListByCategoryService } from "../../services/products/ListByCategoryService";

class ListByCategoryController {
  async handle(req: Request, res: Response) {
    /*
     * O query é o mais apropriada para quando voce quer fazer uma busca
     * específica. Além disso, tive que converter de novo o category_id para
     * number, o unico jeito que funcionou foi de acordo com https://stackoverflow.com/questions/20355876/how-to-send-integers-in-query-parameters-in-nodejs-express-service
     * */
    const category_id = +req.query.category_id;

    const listByCategory = new ListByCategoryService();

    const products = await listByCategory.execute({
      category_id,
    });

    return res.json(products);
  }
}

export { ListByCategoryController };
