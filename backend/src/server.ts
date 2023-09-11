import express, { Request, Response, NextFunction } from "express";

/* depois de fazer o yarn add express-async-errors, é
 * preciso fazer o import (sempre em segundo por orientacao deles) */
import "express-async-errors";

/* Habilita qualquer IP ou URL fazer uma requisicao */
import cors from "cors";
import { router } from "./routes";

const app = express();

/* Especificando que eu quero usar o formato json ao longo
 * do meu programa */
app.use(express.json());
app.use(cors());

/* Aqui eu uso as rotas que eu criei no arquivo src/routes.ts */
app.use(router);

/* Caso eu nao faça o middleware abaixo e de um erro na
 * hora de fazer algum tipo de requisicao vai aparecer uma
 * mensagem muita estranha e que nao é muito "amigavel". Ao
 * fazer o codigo abaixo eu consigo gerar um erro de uma forma
 * que de para entender melhor */
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  /* Caso seja uma instancia do tipo error */
  if (err instanceof Error) {
    return res.status(400).json({ error: err.message });
  }

  /* Se nao for uma instancia do tipo error eu dou um internal
   * serve error */
  return res.status(500).json({
    status: "error",
    message: "internal server error",
  });
});

/* Servidor iniciando em uma porta especifica */
app.listen(3333, () => {
  console.log("Running");
});
