import useValidator from "../hook/useValidator";
import { PRONTUARIOMEDICO, ERROR_PRONTUARIOMEDICO } from "../types/ProntuarioMedico";

const ProntuarioMedicoValidationRules = {

  dataHora:(dataHora)=>{
        let mensagens = [];
        if (!dataHora || dataHora.trim().length === 0){
            mensagens.push('Obrigatório informar a data do Prontuário Médico');
        }
        return mensagens;
    },

  descricao:(descricao)=>{
      let mensagens = [];
      if (!descricao || descricao.trim().length === 0){
          mensagens.push('Obrigatório informar a descrição do Prontuário Médico');
      }
      return mensagens;
  },

  prescricao:(prescricao)=>{
    let mensagens = [];
    if (!prescricao || prescricao.trim().length === 0){
        mensagens.push('Obrigatório informar a prescrição do Prontuário Médico');
    }
    return mensagens;
  },

}

export const useValidarDadosProntuarioMedico = (initialModel, errorModel, validationRules) => {
  return useValidator(PRONTUARIOMEDICO, ERROR_PRONTUARIOMEDICO, ProntuarioMedicoValidationRules);
}
