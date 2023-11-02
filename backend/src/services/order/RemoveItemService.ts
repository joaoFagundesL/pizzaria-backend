import prismaClient from "../../prisma";

interface ItemRequest {
  item_id: number;
}

class RemoveItemService {
  async execute({ item_id }: ItemRequest) {
    const orderItemIsValid = await prismaClient.orderItem.findFirst({
      where: {
        id: item_id,
      },
    });

    if (!orderItemIsValid) {
      throw new Error("this order does not have this item");
    }

    const order = await prismaClient.orderItem.delete({
      where: {
        id: item_id,
      },
    });

    return order;
  }
}

export { RemoveItemService };
