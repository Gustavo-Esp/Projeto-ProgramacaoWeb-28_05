import {Fragment, useEffect, useState} from "react"
import axiosClient from "../../axiosClient";
import { useNavigate, useParams, Link } from "react-router-dom";
import Input from "../../components/input/Input";
import { useValidarDadosUsuario } from "../../rules/UserValidationRules";

export default function UserFormUpdate(){

    const navigate = useNavigate();

    const{
        model,
        setModel,
        error,
        formValid,
        handleBlurField,
        handleChangeField,
    } = useValidarDadosUsuario();

    const {id} = useParams();

    useEffect(() => {
        if (id) {
            axiosClient.get(`/user/show/${id}`)
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
            // Remover campo de senha se estiver vazio
            if (!updatedModel.password) {
                delete updatedModel.password;
            }
            axiosClient.put(`/user/update/${id}`, updatedModel)
                .then(()=>{
                    setModel({});
                    console.log("Usuário alterado com sucesso");
                    navigate('/user/index')
            }).catch((error)=>{
                console.log(error);
            });
        }
        else{
            console.log("Não foi possível alterar o usuário");
        }
    }
    return(
        <Fragment>
            <div className="display">
                <div className="card animated fadeinDown">
                    { model.id && <h1>Alteração do usuário</h1> }

                    <form onSubmit={(e)=>onSubmit(e)}>
                        <div className="p-20">

                            <Input
                                id = "name"
                                type = "text"
                                value = {model.name}
                                placeholder = "Nome do Usuário"
                                handleChangeField = {handleChangeField}
                                handleBlurField = {handleBlurField}
                                error = {error.name}
                                mensagem = {error.nameMensagem}
                            />
                        </div>
                        <div className="p-20">
                            <Input
                                id = "email"
                                type = "text"
                                value = {model.email}
                                placeholder = "E-mail do Usuário"
                                handleChangeField = {handleChangeField}
                                handleBlurField = {handleBlurField}
                                error = {error.email}
                                mensagem = {error.emailMensagem}
                            />
                        </div>
                        <button className="btn btn-edit" to="/user/index">
                            Salvar
                        </button>
                        <Link type="button" className="btn btn-cancel" to="/user/index">
                            Cancelar
                        </Link>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}


