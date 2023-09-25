import { Request, Response } from "express";
import { CreateProductService } from "../../services/products/CreateProductService";

class CreateProductController {
  async handle(req: Request, res: Response) {
    const { name, price, description } = req.body;

    /* Estava dando um erro pois no service ele estava recebendo como string, entao aqui eu
     * converti para number */
    const category_id = parseInt(req.body.category_id, 10);

    const createProduct = new CreateProductService();

    /* A parte de configuracao do envio das imagens estao na pasta config/multer.ts */
    /* Caso a foto nao tenha sido enviada */
    if (!req.file) {
      throw new Error("upload file error");
    } else {
      /* Renomeia o filename para banner pois é a forma como esta configurada no meu banco */
      const { originalname, filename: banner } = req.file;

      const products = await createProduct.execute({
        name,
        price,
        description,
        /* String vazia para o ts nao dar erro */
        banner,
        category_id,
      });

      return res.json(products);
    }
  }
}

export { CreateProductController };
