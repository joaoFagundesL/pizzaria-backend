import prismaClient from "../../prisma";
import { compare } from "bcryptjs";

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

    return { ok: true };
  }
}

export { AuthUserService };
