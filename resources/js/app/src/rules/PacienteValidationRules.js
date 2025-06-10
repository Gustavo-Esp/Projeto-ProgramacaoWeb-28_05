import useValidator from "../hook/useValidator";
import { PACIENTE, ERROR_PACIENTE } from "../types/Paciente";

const PacienteValidationRules = {

  nome:(nome)=>{
        let mensagens = [];
        if (!nome || nome.trim().length === 0){
            mensagens.push('Obrigatório informar o nome do paciente');
        }
        return mensagens;
    },

  dataNascimento:(dataNascimento)=>{
      let mensagens = [];
      if (!dataNascimento || dataNascimento.trim().length === 0){
          mensagens.push('Obrigatório informar a data de nascimento do paciente');
      }
      return mensagens;
  },

  endereco:(endereco)=>{
    let mensagens = [];
    if (!endereco || endereco.trim().length === 0){
        mensagens.push('Obrigatório informar o endereço do paciente');
    }
    return mensagens;
  },

  telefone:(telefone)=>{
      let mensagens = [];
      if (!telefone || telefone.trim().length === 0){
          mensagens.push('Obrigatório informar o telefone do paciente');
      }
      return mensagens;
  },

  email:(email)=>{
    let mensagens = [];
    if (!email || email.trim().length === 0){
        mensagens.push('Obrigatório informar o email do paciente');
    }
    return mensagens;
  },

}

export const useValidarDadosPaciente = (initialModel, errorModel, validationRules) => {
  return useValidator(PACIENTE, ERROR_PACIENTE, PacienteValidationRules);
}
