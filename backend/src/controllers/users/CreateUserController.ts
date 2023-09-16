import { Request, Response } from "express";
import { CreateUserService } from "../../services/users/CreateUserService";

class CreateUserController {
  async handle(req: Request, res: Response) {
    /* Pega todos os dados do json que estao na tabela de users */
    const { name, email, password } = req.body;

    /* Instancia a classe */
    const createUserService = new CreateUserService();

    /* Pega o retorno da funcao do service, precisa ser await
     * pois caos contrario nao será exibido o retorno em formato json
     * , sera apenas um retorno vazio, precisa esperar a resposta */
    const user = await createUserService.execute({ name, email, password });

    /* Retorna em formato json */
    return res.json(user);
  }
}

export { CreateUserController };
