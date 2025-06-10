import useValidator from "../hook/useValidator";
import { PAGAMENTO, ERROR_PAGAMENTO } from "../types/Pagamento";

const PagamentoValidationRules = {

  dataHora:(dataHora)=>{
        let mensagens = [];
        if (!dataHora || dataHora.trim().length === 0){
            mensagens.push('Obrigatório informar a data do pagamento');
        }
        return mensagens;
    },

  valor:(valor)=>{
      let mensagens = [];
      if (!valor || valor.trim().length === 0){
          mensagens.push('Obrigatório informar o valor do pagamento');
      }
      return mensagens;
  },

  metodoPagamento:(metodoPagamento)=>{
    let mensagens = [];
    if (!metodoPagamento || metodoPagamento.trim().length === 0){
        mensagens.push('Obrigatório informar o método de pagamento escolhido');
    }
    return mensagens;
  },

}

export const useValidarDadosPagamento = (initialModel, errorModel, validationRules) => {
  return useValidator(PAGAMENTO, ERROR_PAGAMENTO, PagamentoValidationRules);
}
