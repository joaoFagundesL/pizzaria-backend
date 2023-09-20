import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  /* Para verificar se o usuário está autenticado com o token correto eu preciso
   * informar o token dele, isso é feito no header */
  const authToken = req.headers.authorization;

  if (!authToken) {
    /* 401 é nao autorizado e nesse o caso o end para finalizar imediatamente */
    return res.status(401).end();
  }

  /* O token vem como "Bearer token", logo eu divido por espaco e ignoro a primeira parte
   * do array. Para ignorar a primeira eu faço [, token] e ai eu pego o que eu quero */
  const [, token] = authToken.split(" ");

  try {
    /* O verify pega o token e JWT para comparar. Umas das coisas que esse método
     * retorna é o sub(id), por isso eu descontrui { sub }. */
    const { sub } = verify(token, process.env.JWT_SECRET) as JwtPayload;

    /* Estava retornando como string, entao foi preciso transformar em number (base 10) */
    /* O req.user_id não existe, eu que criei ele no @types e modifiquei o arquivo de config
     * do ts para reconhecer a pasta @types. Agora, eu consigo acessar o req.user_id em outros
     * locais */
    req.user_id = parseInt(sub, 10);

    return next();
  } catch (err) {
    /* A verificacao do token nao deu certo */
    return res.status(401).end();
  }
}
