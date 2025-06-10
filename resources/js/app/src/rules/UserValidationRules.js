import useValidator from "../hook/useValidator";
import { USER, ERROR_USER } from "../types/User";

const PASSWORD_LENGHT = 8;

const UserValidationRules = {

  name:(name)=>{
        let mensagens = [];
        if (!name || name.trim().length === 0){
            mensagens.push('Obrigatório informar o nome do usuário');
        }
        return mensagens;
    },

  email:(email)=>{
      let mensagens = [];
      if (!email || email.trim().length === 0){
          mensagens.push('Obrigatório informar um Email');
      }
      return mensagens;
  },

  password:(password)=>{
    let mensagens = [];
    if (!password || password.trim().length === 0){
        mensagens.push('Obrigatório informar uma Senha');
    }

    if (password && password.length < PASSWORD_LENGHT){
        mensagens.push('A Senha deve ter no mínimo {PASSWORD_LENGHT} caracteres');
    }
    return mensagens;
  },

}

export const useValidarDadosUsuario = (initialModel, errorModel, validationRules) => {
  return useValidator(USER, ERROR_USER, UserValidationRules);
}
