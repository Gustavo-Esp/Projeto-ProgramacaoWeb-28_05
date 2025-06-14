import React, { Fragment, useState, useEffect} from 'react'
import axiosClient from '../../axiosClient';
import { Link, useNavigate} from 'react-router-dom';
import { useValidarDadosConsulta } from '../../rules/ConsultaValidationRules';
import Input from '../../components/input/Input';
import Select from '../../components/input/Select';

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
    } = useValidarDadosConsulta("create");

    const [medicos, setMedicos] = useState([]);

    useEffect(() => {
        axiosClient.get('/medico/index')
            .then(({ data }) => {
                setMedicos(data.data);
            })
            .catch((error) => {
                console.error("Erro ao buscar um médico", error);
            });
    }, []);

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

    // Função do tipo Anônima
    const onSubmit = (e) => {
        e.preventDefault();
        if (formValid()) {
            console.log("Formulário válido");
            axiosClient.post(`/consulta/store`, model)
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
                                type="date"
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
                        <div className="p-20">
                            {pacientes.length === 0 ? (
                                <p style={{ color: "red" }}>
                                    Nenhum paciente encontrado. Cadastre um paciente antes de adicionar as consultas.
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
                        <div className="p-20">
                            {medicos.length === 0 ? (
                                <p style={{ color: "red" }}>
                                    Nenhum medico encontrado. Cadastre um medico antes de adicionar consultas.
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
                                        { value: "", label: "Selecione o medico da consulta" },
                                        ...medicos.map(medico => ({
                                            value: medico.id,
                                            label: `${medico.id} - ${medico.nome}`
                                        }))
                                    ]}
                                />
                            )}
                        </div>
                        <button className="btn btn-add" to="/consulta/index">Salvar</button>
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
