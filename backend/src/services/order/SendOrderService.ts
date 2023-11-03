import { Order } from "@prisma/client";
import prismaClient from "../../prisma";

interface OrderRequest {
  order_id: number;
}

class SendOrderService {
  async execute({ order_id }: OrderRequest) {
    /* Aqui eu busco o pedido pelo id e quando eu encontro
     * eu atualizo o draft dele para falso, dizendo que aquele
     * pedido nao esta mais em rascunho */

    const isOrderIdValid = await prismaClient.order.findUnique({
      where: {
        id: order_id,
      },
    });

    if (!isOrderIdValid) {
      throw new Error("invalid order id");
    }

    const order = await prismaClient.order.update({
      where: {
        id: order_id,
      },

      data: {
        draft: false,
      },
    });

    return order;
  }
}

export { SendOrderService };
