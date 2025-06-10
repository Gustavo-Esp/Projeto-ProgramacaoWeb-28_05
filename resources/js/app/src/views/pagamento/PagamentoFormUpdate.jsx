import {Fragment, useEffect, useState} from "react"
import axiosClient from "../../axiosClient";
import { useNavigate, useParams, Link } from "react-router-dom";
import Input from "../../components/input/Input";
import { useValidarDadosPagamento } from "../../rules/PagamentoValidationRules";

export default function PagamentoFormUpdate(){

    const navigate = useNavigate();

    const   {
            model,
            setModel,
            error,
            formValid,
            handleBlurField,
            handleChangeField,
    } = useValidarDadosPagamento();

    const {id} = useParams();

    useEffect(() => {
        if (id) {
            axiosClient.get(`/pagamento/show/${id}`)
                .then(({ data }) => {
                    setModel(data.data);
                }).catch((error) => {
                    console.log(error);
                });
        }
    }, [id]);

    const onSubmit = (e) => {

        e.preventDefault();

        if(formValid()){
            const updatedModel = { ...model };
            axiosClient.put(`/pagamento/update/${id}`, updatedModel)
                .then(()=>{
                    setModel({});
                    console.log("Pagamento alterado com sucesso");
                    navigate('/pagamento/index')
            }).catch((error)=>{
                console.log(error);
            });
        }
        else{
            console.log("Não foi possível alterar o pagamento");
        }

    }

    return(
        <Fragment>
            <div className="display">
                <div className="card animated fadeinDown">
                    { model.id && <h1>Alteração do Pagamento</h1> }
                    <form onSubmit={(e)=>onSubmit(e)}>
                        <div className="p-20">
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
                        <button className="btn btn-edit" to="/pagamento/index">
                            Salvar
                        </button>
                        <Link type="button" className="btn btn-cancel" to="/pagamento/index">
                            Cancelar
                        </Link>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}
