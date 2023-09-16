import { Router, Request, Response } from "express";
import { CreateUserController } from "./controllers/users/CreateUserController";

const router = Router();

/* Aqui eu chamo o controller e o controller chama os services */
router.post("/users", new CreateUserController().handle);

/* Exporto para poder usar em outras partes do programa,
 * bem como na parte do server.ts */
export { router };
