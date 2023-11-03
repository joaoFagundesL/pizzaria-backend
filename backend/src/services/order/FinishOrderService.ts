import prismaClient from "../../prisma";

interface OrderRequest {
  order_id: number;
}

class FinishOrderService {
  async execute({ order_id }: OrderRequest) {
    const isOrderIdValid = await prismaClient.order.findUnique({
      where: {
        id: order_id,
      },
    });

    if (!isOrderIdValid) {
      throw new Error("id is not valid");
    }

    const order = await prismaClient.order.update({
      where: {
        id: order_id,
      },
      data: {
        status: true,
      },
    });

    return order;
  }
}

export { FinishOrderService };
