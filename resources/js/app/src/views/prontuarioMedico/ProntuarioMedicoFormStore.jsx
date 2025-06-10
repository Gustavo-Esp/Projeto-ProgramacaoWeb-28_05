import React, { Fragment} from 'react'
import axiosClient from '../../axiosClient';
import { Link, useNavigate} from 'react-router-dom';
import { useValidarDadosProntuarioMedico } from '../../rules/ProntuarioMedicoValidationRules';
import Input from '../../components/input/Input';

function ProntuarioMedicoFormStore()
{
    const navigate = useNavigate();

    const {
        model,
        error,
        setModel,
        formValid,
        handleChangeField,
        handleBlurField
    } = useValidarDadosProntuarioMedico();

    // Função do tipo Anônima
    const onSubmit = (e) => {
        e.preventDefault();
        if (formValid()) {
            console.log("Formulário inválido");
            axiosClient.post(`/prontuarioMedico/store`, prontuarioMedico)
            .then(() =>{
                setModel({});
                console.log('Prontuário Médico incluído com sucesso');
                navigate('/prontuarioMedico/index')
            }).catch((error)=>{
                console.log(error);
            })
        }
    }

    return(
        <Fragment>
            <div className="display">
                <div className="card animated fadeinDown">
                    <h1>Inclusão de Prontuário Médico</h1>

                    <form onSubmit={(e)=>onSubmit(e)}>
                        <div className ="p-20"> 
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
                        <button className="btn btn-edit">Salvar</button>
                        <Link
                            type='button' 
                            className='btn btn-cancel'
                            to='/prontuarioMedico/index'>
                                Cancelar
                        </Link>
                    </form>
                </div> 
            </div>
        </Fragment>
    )
}

export default ProntuarioMedicoFormStore
