import React, { Fragment} from 'react'
import axiosClient from '../../axiosClient';
import { Link, useNavigate} from 'react-router-dom';
import { useValidarDadosConsulta } from '../../rules/ConsultaValidationRules';
import Input from '../../components/input/Input';

function ConsultaFormStore()
{
    const navigate = useNavigate();

    const {
        model,
        error,
        setModel,
        formValid,
        handleChangeField,
        handleBlurField
    } = useValidarDadosConsulta();

    // Função do tipo Anônima
    const onSubmit = (e) => {
        e.preventDefault();
        if (formValid()) {
            console.log("Formulário inválido");
            axiosClient.post(`/consulta/store`, consulta)
            .then(() =>{
                setModel({});
                console.log('Consulta incluída com sucesso');
                navigate('/consulta/index')
            }).catch((error)=>{
                console.log(error);
            })
        }
    }

    return(
        <Fragment>
            <div className="display">
                <div className="card animated fadeinDown">
                    <h1>Inclusão de Consulta</h1>

                    <form onSubmit={(e)=>onSubmit(e)}>
                        <div className ="p-20"> 
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
                        <button className="btn btn-edit">Salvar</button>
                        <Link
                            type='button' 
                            className='btn btn-cancel'
                            to='/consulta/index'>
                                Cancelar
                        </Link>
                    </form>
                </div> 
            </div>
        </Fragment>
    )
}

export default ConsultaFormStore
