/* definindo a interface para os campos que serao passados do
 * controller */
interface UserRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute({ name, email, password }: UserRequest) {
    /* Vai enviar o retorno que vai ser pego no controller e formatado
     * em json */
    return { name: name, email: email, password: password };
  }
}

export { CreateUserService };
