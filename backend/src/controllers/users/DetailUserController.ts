import { Request, Response } from "express";
import { DetailUserService } from "../../services/users/DetailUserService";

class DetailUserController {
  async handle(req: Request, res: Response) {
    const detailUserService = new DetailUserService();

    /* na pasta @types eu criei um user_id dentro do req, sendo assim
     * eu consigo acessar ele agora como se fosse um body ou um header. No caso,
     * o req.user_id que eu estou acessando é o sub que eu defini no middleware*/
    const user_id = req.user_id;

    /* Passando o user_id para ser consultado no banco de dados o usuario que acabou
     * de ser autenticado com o token correto e retornar as informacoes dele*/
    const user = await detailUserService.execute(user_id);

    return res.json(user);
  }
}

export { DetailUserController };
