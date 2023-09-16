import { Router, Request, Response } from "express";
import { CreateUserController } from "./controllers/users/CreateUserController";
import { AuthUserController } from "./controllers/users/AuthUserController";

const router = Router();

/* Aqui eu chamo o controller e o controller chama os services */

/* Criar o usuário */
router.post("/users", new CreateUserController().handle);

/* Fazer o login */
router.post("/session", new AuthUserController().handle);

/* Exporto para poder usar em outras partes do programa,
 * bem como na parte do server.ts */
export { router };
