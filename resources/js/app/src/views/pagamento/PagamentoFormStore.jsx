import React, { Fragment, useState, useEffect} from 'react'
import axiosClient from '../../axiosClient';
import { Link, useNavigate} from 'react-router-dom';
import Input from '../../components/input/Input';
import { useValidarDadosPagamento } from '../../rules/PagamentoValidationRules';
import Select from '../../components/input/Select';

function PagamentoFormStore()
{
    const navigate = useNavigate();

    const {
        model,
        error,
        setModel,
        formValid,
        handleChangeField,
        handleBlurField
    } = useValidarDadosPagamento("create");

    const [consultas, setConsultas] = useState([]);

    useEffect(() => {
        axiosClient.get('/consulta/index')
            .then(({ data }) => {
                setConsultas(data.data);
            })
            .catch((error) => {
                console.error("Erro ao buscar uma consulta", error);
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
            axiosClient.post(`/pagamento/store`, model)
            .then(() =>{
                setModel({});
                console.log('Pagamento incluído com sucesso');
                navigate('/pagamento/index')
            }).catch((error)=>{
                console.log(error);
            })
        }
    }

    return(
        <Fragment>
            <div className="display">
                <div className="card animated fadeinDown">
                    <h1>Inclusão de Pagamento</h1>
                    <form onSubmit={(e)=>onSubmit(e)}>
                        <div className ="p-20"> 
                            <Input 
                                id="dataHora"
                                type="date"
                                value={model.dataHora}
                                placeholder="Data do Pagamento"
                                handleChangeField={handleChangeField}
                                handleBlurField={handleBlurField}
                                error={error.dataHora}
                                mensagem={error.dataHoraMensagem}
                            />
                        </div>
                        <div className ="p-20">
                            <Input 
                                id="valor"
                                type="text"
                                value={model.valor}
                                placeholder="Valor do Pagamento"
                                handleChangeField={handleChangeField}
                                handleBlurField={handleBlurField}
                                error={error.valor}
                                mensagem={error.valorMensagem}
                            />
                        </div>
                        <div className ="p-20">
                            <Input 
                                id="metodoPagamento"
                                type="text"
                                value={model.metodoPagamento}
                                placeholder="Metodo de Pagamento"
                                handleChangeField={handleChangeField}
                                handleBlurField={handleBlurField}
                                error={error.metodoPagamento}
                                mensagem={error.metodoPagamentoMensagem}
                            />
                        </div>
                         <div className="p-20">
                            {pacientes.length === 0 ? (
                                <p style={{ color: "red" }}>
                                    Nenhum paciente encontrado. Cadastre um paciente antes de adicionar pagamento.
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
                                        { value: "", label: "Selecione o paciente do pagamento" },
                                        ...pacientes.map(paciente => ({
                                            value: paciente.id,
                                            label: `${paciente.id} - ${paciente.nome}`
                                        }))
                                    ]}
                                />
                            )}
                        </div>
                         <div className="p-20">
                            {consultas.length === 0 ? (
                                <p style={{ color: "red" }}>
                                    Nenhuma consulta encontrada. Cadastre uma consulta antes de adicionar pagamento.
                                </p>
                            ) : (
                                <Select
                                    id="consultaId"
                                    value={model.consultaId}
                                    handleChangeField={handleChangeField}
                                    handleBlurField={handleBlurField}
                                    error={error.consultaId}
                                    mensagem={error.consultaIdMensagem}
                                    options={[
                                        { value: "", label: "Selecione a consulta a ser paga" },
                                        ...consultas.map(consulta => ({
                                            value: consulta.id,
                                            label: `${consulta.id} - ${consulta.dataHora}`
                                        }))
                                    ]}
                                />
                            )}
                        </div>
                        <button className="btn btn-add" to="/pagamento/index">Salvar</button>
                        <Link
                            type='button' 
                            className='btn btn-cancel'
                            to='/pagamento/index'>
                                Cancelar
                        </Link>
                    </form>
                </div> 
            </div>
        </Fragment>
    )
}

export default PagamentoFormStore
