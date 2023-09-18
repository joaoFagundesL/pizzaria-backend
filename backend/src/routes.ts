import { Router, Request, Response } from "express";
import { CreateUserController } from "./controllers/users/CreateUserController";
import { AuthUserController } from "./controllers/users/AuthUserController";
import { DetailUserController } from "./controllers/users/DetailUserController";

import { isAuthenticated } from "./middlewares/isAuthenticated";

const router = Router();

/* Aqui eu chamo o controller e o controller chama os services */

/* Criar o usuário */
router.post("/users", new CreateUserController().handle);

/* Fazer o login */
router.post("/session", new AuthUserController().handle);

/* Em algumas rotas privadas nao sao todas pessoas que podem criar um produto por exemplo,
 * logo eu tenho que saber se a pessoa esta autenticada */
router.get("/me", isAuthenticated, new DetailUserController().handle);

/* Exporto para poder usar em outras partes do programa,
 * bem como na parte do server.ts */
export { router };
