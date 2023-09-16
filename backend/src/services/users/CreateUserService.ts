import PrismaClient from "../../prisma/"; // sem {} porque exportei como default
import { hash } from "bcryptjs";

/* definindo a interface para os campos que serao passados do
 * controller */
interface UserRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  /* {name, email, password} porque esta sendo descontruido */
  async execute({ name, email, password }: UserRequest) {
    if (!email) {
      throw new Error("email incorrect!");
    }

    /* O findFirst vai pegar o primeiro que ele achar */
    const userAlreadyExists = await PrismaClient.user.findFirst({
      where: {
        email: email /* verifica se o email ja existe */,
      },
    });

    if (userAlreadyExists) {
      throw new Error("user already exists!");
    }

    /* Passa como parametro a senha que eu quero criptografar e o método
     * (documentacao), isso vai garantir que no banco a senha nao seja
     * mostrada */
    const passwordHash = await hash(password, 8);

    const user = await PrismaClient.user.create({
      /* passando as informacoes para serem criadas */
      data: {
        name: name,
        email: email,
        password: passwordHash,
      },

      /* informar quais campos devem ser retornados, a senha nesse
       * caso nao vai ser mostrada quando a requisicao for finalizada,
       * sera exibido apenas o que tiver como true */
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    /* vai retornar o user para ser utilizado no controller */
    return user;
  }
}

export { CreateUserService };
