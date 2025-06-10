import React, { Fragment} from 'react'
import axiosClient from '../../axiosClient';
import { Link, useNavigate} from 'react-router-dom';
import Input from '../../components/input/Input';
import { useValidarDadosMedico} from '../../rules/MedicoValidationRules';

function MedicoFormStore()
{
    const navigate = useNavigate();

    const {
        model,
        error,
        setModel,
        formValid,
        handleChangeField,
        handleBlurField
    } = useValidarDadosMedico();

    // Função do tipo Anônima
    const onSubmit = (e) => {
        e.preventDefault();
        if (formValid()) {
            console.log("Formulário inválido");
            axiosClient.post(`/medico/store`, medico)
            .then(() =>{
                setModel({});
                console.log('Medico incluído com sucesso');
                navigate('/medico/index')
            }).catch((error)=>{
                console.log(error);
            })
        }
    }

    return(
        <Fragment>
            <div className="display">
                <div className="card animated fadeinDown">
                    <h1>Inclusão de Medico</h1>

                    <form onSubmit={(e)=>onSubmit(e)}>
                        <div className ="p-20"> 
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
                        <button className="btn btn-edit">Salvar</button>
                        <Link
                            type='button' 
                            className='btn btn-cancel'
                            to='/medico/index'>
                                Cancelar
                        </Link>
                    </form>
                </div> 
            </div>
        </Fragment>
    )
}

export default MedicoFormStore
