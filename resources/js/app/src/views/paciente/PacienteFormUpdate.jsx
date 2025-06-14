import {Fragment, useEffect, useState} from "react"
import axiosClient from "../../axiosClient";
import { useNavigate, useParams, Link } from "react-router-dom";
import Input from "../../components/input/Input";
import { useValidarDadosPaciente } from "../../rules/PacienteValidationRules";

export default function PacienteFormUpdate(){

    const navigate = useNavigate();

    const   {
            model,
            setModel,
            error,
            formValid,
            handleBlurField,
            handleChangeField,
    } = useValidarDadosPaciente();

    const {id} = useParams();

    useEffect(() => {
        if (id) {
            axiosClient.get(`/paciente/show/${id}`)
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
            axiosClient.put(`/paciente/update/${id}`, updatedModel)
                .then(()=>{
                    setModel({});
                    console.log("Paciente alterado com sucesso");
                    navigate('/paciente/index')
            }).catch((error)=>{
                console.log(error);
            });
        }
        else{
            console.log("Não foi possível alterar o Paciente");
        }

    }

    return(
        <Fragment>
            <div className="display">
                <div className="card animated fadeinDown">
                    { model.id && <h1>Alteração do Paciente</h1> }
                    <form onSubmit={(e)=>onSubmit(e)}>
                        <div className="p-20">
                            <Input 
                                id="nome"
                                type="text"
                                value={model.nome}
                                placeholder="Nome do Paciente"
                                handleChangeField={handleChangeField}
                                handleBlurField={handleBlurField}
                                error={error.nome}
                                mensagem={error.nomeMensagem}
                            />
                        </div>
                        <div className ="p-20">
                            <Input 
                                id="dataNascimento"
                                type="text"
                                value={model.dataNascimento}
                                placeholder="Data de Nascimento do Paciente"
                                handleChangeField={handleChangeField}
                                handleBlurField={handleBlurField}
                                error={error.dataNascimento}
                                mensagem={error.dataNascimentoMensagem}
                            />
                        </div>
                        <div className ="p-20">
                            <Input 
                                id="endereco"
                                type="text"
                                value={model.endereco}
                                placeholder="Endereço do Paciente"
                                handleChangeField={handleChangeField}
                                handleBlurField={handleBlurField}
                                error={error.endereco}
                                mensagem={error.enderecoMensagem}
                            />
                        </div>
                        <div className ="p-20">
                            <Input 
                                id="telefone"
                                type="text"
                                value={model.telefone}
                                placeholder="Telefone do Paciente"
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
                                placeholder="Email do Paciente"
                                handleChangeField={handleChangeField}
                                handleBlurField={handleBlurField}
                                error={error.email}
                                mensagem={error.emailMensagem}
                            />
                        </div>
                        <button className="btn btn-edit">
                            Salvar
                        </button>
                        <Link type="button" className="btn btn-cancel" to="/paciente/index">
                            Cancelar
                        </Link>

                    </form>
                </div>
            </div>
        </Fragment>
    )
}
