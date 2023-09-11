import { Router, Request, Response } from "express";

const router = Router();

/* Aqui eu estou usando a tipagem do typescript para dizer
 * o tipo do req e do res */
router.get("/teste", (req: Request, res: Response) => {
  // throw new Error("erro ao fazer requisicao");
  return res.json({ ok: true });
});

/* Exporto para poder usar em outras partes do programa,
 * bem como na parte do server.ts */
export { router };
