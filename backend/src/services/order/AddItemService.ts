import prismaClient from "../../prisma";

interface OrderRequest {
  /* Tratando a tabela que surgiu do relacionamento n-n,
   * por isso os dois id que vem de outras duas tabelas */
  order_id: number;
  product_id: number;
  amount: number;
}

class AddItemService {
  async execute({ order_id, product_id, amount }: OrderRequest) {
    /* Antes de adicionar primeiro eu verifico se o que foi
     * passado realmente existe */
    const orderIdIsValid = await prismaClient.order.findUnique({
      where: {
        id: order_id,
      },
    });

    if (!orderIdIsValid) {
      throw new Error("this order does not exist");
    }

    const productIdIsValid = await prismaClient.product.findUnique({
      where: {
        id: product_id,
      },
    });

    if (!productIdIsValid) {
      throw new Error("this product does not exist");
    }

    const order = await prismaClient.orderItem.create({
      data: {
        order_id: order_id,
        product_id: product_id,
        amount: amount,
      },
    });

    return order;
  }
}

export { AddItemService };
