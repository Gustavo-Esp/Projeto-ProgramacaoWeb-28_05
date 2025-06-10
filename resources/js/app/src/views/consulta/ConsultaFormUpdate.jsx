import {Fragment, useEffect, useState} from "react"
import axiosClient from "../../axiosClient";
import { useNavigate, useParams, Link } from "react-router-dom";
import Input from "../../components/input/Input";
import {useValidarDadosConsulta} from "../../rules/ConsultaValidationRules";

export default function ConsultaFormUpdate(){

    const navigate = useNavigate();

    const   {
            model,
            setModel,
            error,
            formValid,
            handleBlurField,
            handleChangeField,
    } = useValidarDadosConsulta();

    const {id} = useParams();

    useEffect(() => {
        if (id) {
            axiosClient.get(`/consulta/show/${id}`)
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
            axiosClient.put(`/consulta/update/${id}`, updatedModel)
                .then(()=>{
                    setModel({});
                    console.log("Consulta alterado com sucesso");
                    navigate('/consulta/index')
            }).catch((error)=>{
                console.log(error);
            });
        }
        else{
            console.log("Não foi possível alterar a Consulta");
        }

    }

    return(
        <Fragment>
            <div className="display">
                <div className="card animated fadeinDown">
                    { model.id && <h1>Alteração do Consulta</h1> }
                    <form onSubmit={(e)=>onSubmit(e)}>
                        <div className="p-20">
                            <Input 
                                id="dataHora"
                                type="text"
                                value={model.dataHora}
                                placeholder="Data da Consulta"
                                handleChangeField={handleChangeField}
                                handleBlurField={handleBlurField}
                                error={error.dataHora}
                                mensagem={error.dataHoraMensagem}
                            />
                        </div>
                        <div className ="p-20">
                            <Input 
                                id="status"
                                type="text"
                                value={model.status}
                                placeholder="Status da Consulta"
                                handleChangeField={handleChangeField}
                                handleBlurField={handleBlurField}
                                error={error.status}
                                mensagem={error.statusMensagem}
                            />
                        </div>
                        <div className ="p-20">
                            <Input 
                                id="motivo"
                                type="text"
                                value={model.motivo}
                                placeholder="Motivo da Consulta"
                                handleChangeField={handleChangeField}
                                handleBlurField={handleBlurField}
                                error={error.motivo}
                                mensagem={error.motivoMensagem}
                            />
                        </div>
                        <button className="btn btn-edit" to="/consulta/index">
                            Salvar
                        </button>
                        <Link type="button" className="btn btn-cancel" to="/consulta/index">
                            Cancelar
                        </Link>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}
