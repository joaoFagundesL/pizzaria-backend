import prismaClient from "../../prisma";

interface DetailRequest {
  order_id: number;
}

class OrderDetailsService {
  async execute({ order_id }: DetailRequest) {
    const isOrderIdValid = await prismaClient.order.findUnique({
      where: {
        id: order_id,
      },
    });

    if (!isOrderIdValid) {
      throw new Error("id is not valid");
    }

    const orderDetails = await prismaClient.orderItem.findMany({
      where: {
        order_id: order_id,
      },

      /* Ele retornava apenas o product_id e o order
       * e nao as informacoes, o include funciona
       * como se fosse um outro join e assim ele mostra
       * as informacoes do produto e order */
      include: {
        product: true,
        order: true,
      },
    });

    return orderDetails;
  }
}

export { OrderDetailsService };
