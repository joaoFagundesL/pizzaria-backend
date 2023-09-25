import { Request, Response } from "express";
import { CreateProductService } from "../../services/products/CreateProductService";

class CreateProductController {
  async handle(req: Request, res: Response) {
    const { name, price, description, category_id } = req.body;
    let banner = "";

    const createProduct = new CreateProductService();

    const produts = await createProduct.execute({
      name,
      price,
      description,
      banner,
      category_id,
    });

    return res.json(produts);
  }
}

export { CreateProductController };
