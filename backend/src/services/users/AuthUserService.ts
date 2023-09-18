import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken"; // importando para trabalhar com o JWT

/* Tipar os dados que foram passdos pelo controller */
interface AuthRequest {
  email: string;
  password: string;
}

class AuthUserService {
  async execute({ email, password }: AuthRequest) {
    /* verificar se o email está cadastrado */
    const user = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new Error("email/password incorret");
    }

    /* Como a senha esta criptografada foi preciso usar o compare da
     * biblioteca que foi importada. O user.password ta acessando a senha
     * considerando que o email ja esta cadastrado no banco de dados,
     * esse metodo retorna true ou false*/
    const passwordMatch = await compare(password, user.password);

    /* Se a senha nao bate, ou seja se tiver retornado false */
    if (!passwordMatch) {
      throw new Error("email/password incorret");
    }

    /* Geracao do token para o usuário. Isso é necessario pois apenas um usuário
     * logado e com um token pode cadastrar produtos. Esse é um dos motivos do porque
     * a JWT e a partir desse token eu consigo saber se o usuário esta autenticado */
    const token = sign(
      {
        name: user.name,
        email: user.email,
      },

      /* process.env sao as variaveis ambientes que estao definidas no arquivo .env.
       * Nesse caso a JWT_SECRET foi definida para assinar os tokens que vao ser gerados */
      process.env.JWT_SECRET,
      {
        subject: String(user.id), // se nao converter para string ele da um erro, pois a bilbioteca espera uma string e nao um number
        expiresIn: "30d",
      },
    );

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token: token,
    };
  }
}

export { AuthUserService };
