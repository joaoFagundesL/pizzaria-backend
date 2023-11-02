import { Request, Response } from "express";
import { CreateOrderService } from "../../services/order/CreateOrderService";

class CreateOrderController {
  async handle(req: Request, res: Response) {
    const { table, name } = req.body;

    const createOrderService = new CreateOrderService();

    console.log(table, name);

    const order = await createOrderService.execute({
      table,
      name,
    });

    return res.json(order);
  }
}

export { CreateOrderController };
