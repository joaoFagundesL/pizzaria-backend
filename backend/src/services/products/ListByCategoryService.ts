import prismaClient from "../../prisma";

interface ProductRequest {
  category_id: number;
}

class ListByCategoryService {
  async execute({ category_id }: ProductRequest) {
    /* Find many já que em uma categoria eu posso ter varios produtos
     * e eu quero listar todos eles*/
    const findByCategory = await prismaClient.product.findMany({
      where: {
        category_id: category_id,
      },
    });

    return findByCategory;
  }
}

export { ListByCategoryService };
