import useValidator from "../hook/useValidator";
import { CONSULTA, ERROR_CONSULTA } from "../types/Consulta";

const ConsultaValidationRules = {

  dataHora:(dataHora)=>{
        let mensagens = [];
        if (!dataHora || dataHora.trim().length === 0){
            mensagens.push('Obrigatório informar a data da consulta');
        }
        return mensagens;
    },

  status:(status)=>{
      let mensagens = [];
      if (!status || status.trim().length === 0){
          mensagens.push('Obrigatório informar o status da consulta');
      }
      return mensagens;
  },

  motivo:(motivo)=>{
    let mensagens = [];
    if (!motivo || motivo.trim().length === 0){
        mensagens.push('Obrigatório informar o motivo da consulta');
    }
    return mensagens;
  },

}

export const useValidarDadosConsulta = (initialModel, errorModel, validationRules) => {
  return useValidator(CONSULTA, ERROR_CONSULTA, ConsultaValidationRules);
}
