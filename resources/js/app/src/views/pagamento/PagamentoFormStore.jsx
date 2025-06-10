import React, { Fragment} from 'react'
import axiosClient from '../../axiosClient';
import { Link, useNavigate} from 'react-router-dom';
import Input from '../../components/input/Input';
import { useValidarDadosPagamento } from '../../rules/PagamentoValidationRules';

function PagamentoFormStore()
{
    const navigate = useNavigate();

    const {
        model,
        error,
        setModel,
        formValid,
        handleChangeField,
        handleBlurField
    } = useValidarDadosPagamento();

    // Função do tipo Anônima
    const onSubmit = (e) => {
        e.preventDefault();
        if (formValid()) {
            console.log("Formulário inválido");
            axiosClient.post(`/pagamento/store`, pagamento)
            .then(() =>{
                setModel({});
                console.log('Pagamento incluído com sucesso');
                navigate('/pagamento/index')
            }).catch((error)=>{
                console.log(error);
            })
        }
    }

    return(
        <Fragment>
            <div className="display">
                <div className="card animated fadeinDown">
                    <h1>Inclusão de Pagamento</h1>
                    <form onSubmit={(e)=>onSubmit(e)}>
                        <div className ="p-20"> 
                            <Input 
                                id="dataHora"
                                type="text"
                                value={model.dataHora}
                                placeholder="Data do Pagamento"
                                handleChangeField={handleChangeField}
                                handleBlurField={handleBlurField}
                                error={error.dataHora}
                                mensagem={error.dataHoraMensagem}
                            />
                        </div>
                        <div className ="p-20">
                            <Input 
                                id="valor"
                                type="text"
                                value={model.valor}
                                placeholder="Valor do Pagamento"
                                handleChangeField={handleChangeField}
                                handleBlurField={handleBlurField}
                                error={error.valor}
                                mensagem={error.valorMensagem}
                            />
                        </div>
                        <div className ="p-20">
                            <Input 
                                id="metodoPagamento"
                                type="text"
                                value={model.metodoPagamento}
                                placeholder="Metodo de Pagamento"
                                handleChangeField={handleChangeField}
                                handleBlurField={handleBlurField}
                                error={error.metodoPagamento}
                                mensagem={error.metodoPagamentoMensagem}
                            />
                        </div>
                        <button className="btn btn-edit">Salvar</button>
                        <Link
                            type='button' 
                            className='btn btn-cancel'
                            to='/pagamento/index'>
                                Cancelar
                        </Link>
                    </form>
                </div> 
            </div>
        </Fragment>
    )
}

export default PagamentoFormStore
