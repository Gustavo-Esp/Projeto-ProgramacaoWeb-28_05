import React, { Fragment} from 'react'
import axiosClient from '../../axiosClient';
import { Link, useNavigate} from 'react-router-dom';
import Input from '../../components/input/Input';
import { useValidarDadosPaciente } from '../../rules/PacienteValidationRules';

function PacienteFormStore()
{
    const navigate = useNavigate();

    const {
        model,
        error,
        setModel,
        formValid,
        handleChangeField,
        handleBlurField
    } = useValidarDadosPaciente();

    // Função do tipo Anônima
    const onSubmit = (e) => {
        e.preventDefault();
        if (formValid()) {
            console.log("Formulário inválido");
            axiosClient.post(`/paciente/store`, paciente)
            .then(() =>{
                setModel({});
                console.log('Paciente incluído com sucesso');
                navigate('/paciente/index')
            }).catch((error)=>{
                console.log(error);
            })
        }
    }

    return(
        <Fragment>
            <div className="display">
                <div className="card animated fadeinDown">
                    <h1>Inclusão de Paciente</h1>

                    <form onSubmit={(e)=>onSubmit(e)}>
                        <div className ="p-20"> 
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
                        <button className="btn btn-edit">Salvar</button>
                        <Link
                            type='button' 
                            className='btn btn-cancel'
                            to='/paciente/index'>
                                Cancelar
                        </Link>
                    </form>
                </div> 
            </div>
        </Fragment>
    )
}

export default PacienteFormStore
