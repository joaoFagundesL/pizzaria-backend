import multer from "multer";
import crypto from "crypto";

import { extname, resolve } from "path";

export default {
  /* Vai receber o nome da pasta que eu quero salvar a imagem */
  upload(folder: string) {
    return {
      storage: multer.diskStorage({
        /* Destino de onde eu vou salvar a foto */
        /* O dirname é a pasta onde eu estou atualmente, assim eu preciso voltar 2 vezes até a minha folder que vai ser a tmp */
        destination: resolve(__dirname, "..", "..", folder),

        /* Evitar conflito de nomes, assim vai ser gerado um hash */
        filename: (request, file, callback) => {
          const fileHash = crypto.randomBytes(16).toString("hex"); // gera em hexadecimal
          const filename = `${fileHash}-${file.originalname}`; // como o nome vai ser do arquivo, no caso vai ser o hash seguido pelo nome da foto

          return callback(null, filename);
        },
      }),
    };
  },
};
