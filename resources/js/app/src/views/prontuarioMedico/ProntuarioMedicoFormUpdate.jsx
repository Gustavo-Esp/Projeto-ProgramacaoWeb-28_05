import {Fragment, useEffect, useState} from "react"
import axiosClient from "../../axiosClient";
import { useNavigate, useParams, Link } from "react-router-dom";
import Input from "../../components/input/Input";
import {useValidarDadosProntuarioMedico} from "../../rules/ProntuarioMedicoValidationRules";

export default function ProntuarioMedicoFormUpdate(){

    const navigate = useNavigate();

    const   {
            model,
            setModel,
            error,
            formValid,
            handleBlurField,
            handleChangeField,
    } = useValidarDadosProntuarioMedico();

    const {id} = useParams();

    useEffect(() => {
        if (id) {
            axiosClient.get(`/prontuarioMedico/show/${id}`)
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
            axiosClient.put(`/prontuarioMedico/update/${id}`, updatedModel)
                .then(()=>{
                    setModel({});
                    console.log("Prontuário Medico alterado com sucesso");
                    navigate('/prontuarioMedico/index')
            }).catch((error)=>{
                console.log(error);
            });
        }
        else{
            console.log("Não foi possível alterar o prontuario médico");
        }

    }

    return(
        <Fragment>
            <div className="display">
                <div className="card animated fadeinDown">
                    { model.id && <h1>Alteração do Prontuario Médico</h1> }

                    <form onSubmit={(e)=>onSubmit(e)}>
                        <div className="p-20">
                            <Input 
                                id="dataHora"
                                type="text"
                                value={model.dataHora}
                                placeholder="Data do Prontuário Médico"
                                handleChangeField={handleChangeField}
                                handleBlurField={handleBlurField}
                                error={error.dataHora}
                                mensagem={error.dataHoraMensagem}
                            />
                        </div>
                        <div className ="p-20">
                            <Input 
                                id="descricao"
                                type="text"
                                value={model.descricao}
                                placeholder="Descrição"
                                handleChangeField={handleChangeField}
                                handleBlurField={handleBlurField}
                                error={error.descricao}
                                mensagem={error.descricaoMensagem}
                            />
                        </div>
                        <div className ="p-20">
                            <Input 
                                id="prescricao"
                                type="text"
                                value={model.pescricao}
                                placeholder="Prescrição"
                                handleChangeField={handleChangeField}
                                handleBlurField={handleBlurField}
                                error={error.prescricao}
                                mensagem={error.prescricaoMensagem}
                            />
                        </div>
                        <button className="btn btn-edit" to="/prontuarioMedico/index">
                            Salvar
                        </button>
                        <Link type="button" className="btn btn-cancel" to="/prontuarioMedico/index">
                            Cancelar
                        </Link>

                    </form>
                </div>
            </div>
        </Fragment>
    )
}
