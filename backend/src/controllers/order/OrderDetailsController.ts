import { Request, Response } from "express";
import { OrderDetailsService } from "../../services/order/OrderDetailsService";

class OrderDetailsController {
  async handle(req: Request, res: Response) {
    const order_id = +req.query.order_id;

    const orderDetails = new OrderDetailsService();

    const order = await orderDetails.execute({
      order_id,
    });

    return res.json(order);
  }
}

export { OrderDetailsController };
