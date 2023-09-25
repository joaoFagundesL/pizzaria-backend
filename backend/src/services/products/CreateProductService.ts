import prismaClient from "../../prisma";

interface ProductRequest {
  name: string;
  price: string;
  description: string;
  banner: string; // url
  category_id: number;
}

class CreateProductService {
  async execute({
    name,
    price,
    description,
    banner,
    category_id,
  }: ProductRequest) {
    /* Aqui eu busco a categoria que o usuario informou para saber se ela existe */
    const category = await prismaClient.category.findFirst({
      where: {
        id: category_id,
      },
    });

    if (!category) {
      throw new Error("invalid category id!");
    } else {
      /* Caso a categoria seja valida ele pode criar o produto */
      const product = await prismaClient.product.create({
        data: {
          name: name,
          price: price,
          description: description,
          banner: banner,
          category_id: category_id,
        },
      });
      return product;
    }
  }
}

export { CreateProductService };
