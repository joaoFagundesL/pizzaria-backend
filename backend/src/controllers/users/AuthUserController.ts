import { Request, Response } from "express";
import { AuthUserService } from "../../services/users/AuthUserService";

class AuthUserController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body;

    /* Apenas pega as informacoes necessarias para o service fazer
     * a autenticacao */
    const authUserService = new AuthUserService();

    /* Colocar o await para esperar a resposta e passar os dados para
     * o metodo que vai autenticar*/
    const auth = await authUserService.execute({ email, password });

    return res.json(auth);
  }
}

export { AuthUserController };
