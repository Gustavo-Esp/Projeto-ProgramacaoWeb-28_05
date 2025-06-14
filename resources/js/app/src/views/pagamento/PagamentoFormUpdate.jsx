import {Fragment, useEffect, useState} from "react"
import axiosClient from "../../axiosClient";
import { useNavigate, useParams, Link } from "react-router-dom";
import Input from "../../components/input/Input";
import { useValidarDadosPagamento } from "../../rules/PagamentoValidationRules";
import Select from "../../components/input/Select";

export default function PagamentoFormUpdate(){

    const navigate = useNavigate();

    const   {
            model,
            setModel,
            error,
            formValid,
            handleBlurField,
            handleChangeField,
    } = useValidarDadosPagamento();

    const {id} = useParams();

    const [pacientes, setPacientes] = useState([]);

    useEffect(() => {
        axiosClient.get('/paciente/index') 
            .then(({ data }) => {
                setPacientes(data.data);
            })
            .catch((error) => {
                console.error("Erro ao buscar paciente:", error);
            });
    }, []);

    const [consultas, setConsultas] = useState([]);

    useEffect(() => {
        axiosClient.get('/consulta/index') 
            .then(({ data }) => {
                setConsultas(data.data);
            })
            .catch((error) => {
                console.error("Erro ao buscar consulta:", error);
            });
    }, []);

      useEffect(() => {
        if (id) {
            axiosClient.get(`/pagamento/show/${id}`)
            .then(({ data }) => {
                const pagamento = data.data;
                setModel({
                id: pagamento.id || "",
                dataHora: pagamento.dataHora || "",
                valor: pagamento.valor || "",
                metodoPagamento: pagamento.metodoPagamento || "",
                pacienteId: pagamento.pacienteId?.toString() || "", 
                consultaId: pagamento.consultaId?.toString() || "",
                });
            })
            .catch((error) => {
                console.log("Erro ao carregar o pagamento:", error);
            });
        }
    }, [id]);

    const onSubmit = (e) => {

        e.preventDefault();

        if(formValid()){
            const updatedModel = { ...model };
            axiosClient.put(`/pagamento/update/${id}`, updatedModel)
                .then(()=>{
                    setModel({});
                    console.log("Pagamento alterado com sucesso");
                    navigate('/pagamento/index')
            }).catch((error)=>{
                console.log(error);
            });
        }
        else{
            console.log("Não foi possível alterar o pagamento");
        }

    }

    return(
        <Fragment>
            <div className="display">
                <div className="card animated fadeinDown">
                    { model.id && <h1>Alteração do Pagamento</h1> }
                    <form onSubmit={(e)=>onSubmit(e)}>
                        <div className="p-20">
                            <Input 
                                id="dataHora"
                                type="text"
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
                        <Select
                            id="pacienteId"
                            value={model.pacienteId}
                            handleChangeField={handleChangeField}
                            handleBlurField={handleBlurField}
                            error={error.pacienteId}
                            mensagem={error.pacienteIdMensagem}
                            options={[
                                { value: "", label: "Selecione o Paciente do pagamento" },
                                ...pacientes.map(paciente => ({
                                    value: paciente.id,
                                    label: `${paciente.id} - ${paciente.nome}`
                                }))
                            ]}
                        />                     
                        </div>
                        <div className="p-20">                          
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
                        </div>
                         <button className="btn btn-edit" to="/pagamento/index">Salvar</button>
                        <Link type="button" className="btn btn-cancel" to="/pagamento/index">
                            Cancelar
                        </Link>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}
