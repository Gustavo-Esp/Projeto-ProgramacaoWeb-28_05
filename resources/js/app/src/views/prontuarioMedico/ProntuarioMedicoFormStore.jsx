import React, { Fragment, useState, useEffect} from 'react'
import axiosClient from '../../axiosClient';
import { Link, useNavigate} from 'react-router-dom';
import { useValidarDadosProntuarioMedico } from '../../rules/ProntuarioMedicoValidationRules';
import Input from '../../components/input/Input';
import Select from '../../components/input/Select';

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
    } = useValidarDadosProntuarioMedico("create");

    const [pacientes, setPacientes] = useState([]);

    useEffect(() => {
        axiosClient.get('/paciente/index')
            .then(({ data }) => {
                setPacientes(data.data);
            })
            .catch((error) => {
                console.error("Erro ao buscar paciente", error);
            });
    }, []);

       const [medicos, setMedicos] = useState([]);

    useEffect(() => {
        axiosClient.get('/medico/index')
            .then(({ data }) => {
                setMedicos(data.data);
            })
            .catch((error) => {
                console.error("Erro ao buscar medico", error);
            });
    }, []);

    // Função do tipo Anônima
    const onSubmit = (e) => {
        e.preventDefault();
        if (formValid()) {
            console.log("Formulário válido");
            axiosClient.post(`/prontuarioMedico/store`, model)
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
                                type="date"
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
                                value={model.prescricao}
                                placeholder="Prescrição"
                                handleChangeField={handleChangeField}
                                handleBlurField={handleBlurField}
                                error={error.prescricao}
                                mensagem={error.prescricaoMensagem}
                            />
                        </div>
                        <div className="p-20">
                            {medicos.length === 0 ? (
                                <p style={{ color: "red" }}>
                                    Nenhum medico encontrado. Cadastre um medico antes de criar um prontuário médico.
                                </p>
                            ) : (
                                <Select
                                    id="medicoId"
                                    value={model.medicoId}
                                    handleChangeField={handleChangeField}
                                    handleBlurField={handleBlurField}
                                    error={error.medicoId}
                                    mensagem={error.medicoIdMensagem}
                                    options={[
                                        { value: "", label: "Selecione o medico do prontuario" },
                                        ...medicos.map(medico => ({
                                            value: medico.id,
                                            label: `${medico.id} - ${medico.nome}`
                                        }))
                                    ]}
                                />
                            )}
                        </div>
                        <div className="p-20">
                            {pacientes.length === 0 ? (
                                <p style={{ color: "red" }}>
                                    Nenhum paciente encontrado. Cadastre um paciente antes de acionar as consultas.
                                </p>
                            ) : (
                                <Select
                                    id="pacienteId"
                                    value={model.pacienteId}
                                    handleChangeField={handleChangeField}
                                    handleBlurField={handleBlurField}
                                    error={error.pacienteId}
                                    mensagem={error.pacienteIdMensagem}
                                    options={[
                                        { value: "", label: "Selecione o paciente da consulta" },
                                        ...pacientes.map(paciente => ({
                                            value: paciente.id,
                                            label: `${paciente.id} - ${paciente.nome}`
                                        }))
                                    ]}
                                />
                            )}
                        </div>
                        <button className="btn btn-add" to="/prontuarioMedico/index">Salvar</button>
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
