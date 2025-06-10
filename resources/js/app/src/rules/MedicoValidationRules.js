import useValidator from "../hook/useValidator";
import { MEDICO, ERROR_MEDICO } from "../types/Medico";

const MedicoValidationRules = {

  nome:(nome)=>{
        let mensagens = [];
        if (!nome || nome.trim().length === 0){
            mensagens.push('Obrigatório informar o nome do médico');
        }
        return mensagens;
    },

  especialidade:(especialidade)=>{
      let mensagens = [];
      if (!especialidade || especialidade.trim().length === 0){
          mensagens.push('Obrigatório informar a especialidade do médico');
      }
      return mensagens;
  },

  crm:(crm)=>{
    let mensagens = [];
    if (!crm || crm.trim().length === 0){
        mensagens.push('Obrigatório informar o crm do médico');
    }
    return mensagens;
  },

  telefone:(telefone)=>{
      let mensagens = [];
      if (!telefone || telefone.trim().length === 0){
          mensagens.push('Obrigatório informar o telefone do médico');
      }
      return mensagens;
  },

  email:(email)=>{
    let mensagens = [];
    if (!email || email.trim().length === 0){
        mensagens.push('Obrigatório informar o email do médico');
    }
    return mensagens;
  },

}

export const useValidarDadosMedico = (initialModel, errorModel, validationRules) => {
  return useValidator(MEDICO, ERROR_MEDICO, MedicoValidationRules);
}
