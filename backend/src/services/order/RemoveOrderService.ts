import prismaClient from "../../prisma";

interface OrderRequest {
  order_id: number;
}

class RemoveOrderService {
  async execute({ order_id }: OrderRequest) {
    /* recebe um id, procura no banco e delete caso
     * seja o id procurado */

    /* eu poderia ter usado o delete direto mas nao estava
     * conseguindo a mensagem de erro que eu queria entao pesquisei o id
     * primeiro para deletar deposi */
    const order = await prismaClient.order.findUnique({
      where: {
        id: order_id,
      },
    });

    if (!order) {
      throw new Error("id not found!");
    }

    await prismaClient.order.delete({
      where: {
        id: order_id,
      },
    });

    return order;
  }
}

export { RemoveOrderService };
