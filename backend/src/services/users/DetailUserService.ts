import prismaClient from "../../prisma";

class DetailUserService {
  async execute(user_id: number) {
    const user = await prismaClient.user.findFirst({
      /* Faz a busca no banco do usuário */
      where: {
        id: user_id,
      },

      /* Os campos que eu quero retornar */
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
    return user;
  }
}

export { DetailUserService };
