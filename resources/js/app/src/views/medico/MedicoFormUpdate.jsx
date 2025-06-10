import {Fragment, useEffect, useState} from "react"
import axiosClient from "../../axiosClient";
import { useNavigate, useParams, Link } from "react-router-dom";
import Input from "../../components/input/Input";
import { useValidarDadosMedico } from "../../rules/MedicoValidationRules";

export default function MedicoFormUpdate(){

    const navigate = useNavigate();

    const   {
            model,
            setModel,
            error,
            formValid,
            handleBlurField,
            handleChangeField,
    } = useValidarDadosMedico();

    const {id} = useParams();

    useEffect(() => {
        if (id) {
            axiosClient.get(`/medico/show/${id}`)
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
            axiosClient.put(`/medico/update/${id}`, updatedModel)
                .then(()=>{
                    setModel({});
                    console.log("Medico alterado com sucesso");
                    navigate('/medico/index')
            }).catch((error)=>{
                console.log(error);
            });
        }
        else{
            console.log("Não foi possível alterar o Medico");
        }

    }

    return(
        <Fragment>
            <div className="display">
                <div className="card animated fadeinDown">
                    { model.id && <h1>Alteração do Medico</h1> }
                    <form onSubmit={(e)=>onSubmit(e)}>
                        <div className="p-20">
                            <Input 
                                id="nome"
                                type="text"
                                value={model.nome}
                                placeholder="Nome do Medico"
                                handleChangeField={handleChangeField}
                                handleBlurField={handleBlurField}
                                error={error.nome}
                                mensagem={error.nomeMensagem}
                            />
                        </div>
                        <div className ="p-20">
                            <Input 
                                id="especialidade"
                                type="text"
                                value={model.especialidade}
                                placeholder="Especialidade do Medico"
                                handleChangeField={handleChangeField}
                                handleBlurField={handleBlurField}
                                error={error.especialidade}
                                mensagem={error.especialidadeMensagem}
                            />
                        </div>
                        <div className ="p-20">
                            <Input 
                                id="crm"
                                type="text"
                                value={model.crm}
                                placeholder="CRM do Medico"
                                handleChangeField={handleChangeField}
                                handleBlurField={handleBlurField}
                                error={error.crm}
                                mensagem={error.crmMensagem}
                            />
                        </div>
                        <div className ="p-20">
                            <Input 
                                id="telefone"
                                type="text"
                                value={model.telefone}
                                placeholder="Telefone do Medico"
                                handleChangeField={handleChangeField}
                                handleBlurField={handleBlurField}
                                error={error.telefone}
                                mensagem={error.telefoneMensagem}
                            />
                        </div>
                        <div className ="p-20">
                            <Input 
                                id="email"
                                type="text"
                                value={model.email}
                                placeholder="Email do Medico"
                                handleChangeField={handleChangeField}
                                handleBlurField={handleBlurField}
                                error={error.email}
                                mensagem={error.emailMensagem}
                            />
                        </div>
                        <button className="btn btn-edit" to="/medico/index">
                            Salvar
                        </button>
                        <Link type="button" className="btn btn-cancel" to="/medico/index">
                            Cancelar
                        </Link>

                    </form>
                </div>
            </div>
        </Fragment>
    )
}
