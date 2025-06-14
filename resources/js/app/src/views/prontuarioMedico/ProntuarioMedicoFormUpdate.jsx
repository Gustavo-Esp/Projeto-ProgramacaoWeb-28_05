import {Fragment, useEffect, useState} from "react"
import axiosClient from "../../axiosClient";
import { useNavigate, useParams, Link } from "react-router-dom";
import Input from "../../components/input/Input";
import {useValidarDadosProntuarioMedico} from "../../rules/ProntuarioMedicoValidationRules";
import Select from "../../components/input/Select";

export default function ProntuarioMedicoFormUpdate(){

    const navigate = useNavigate();

    const   {
            model,
            setModel,
            error,
            formValid,
            handleBlurField,
            handleChangeField,
    } = useValidarDadosProntuarioMedico();

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

    const [medicos, setMedicos] = useState([]);

    useEffect(() => {
        axiosClient.get('/medico/index') 
            .then(({ data }) => {
                setMedicos(data.data);
            })
            .catch((error) => {
                console.error("Erro ao buscar medico:", error);
            });
    }, []);


      useEffect(() => {
        if (id) {
            axiosClient.get(`/prontuarioMedico/show/${id}`)
            .then(({ data }) => {
                const prontuarioMedico = data.data;
                setModel({
                id: prontuarioMedico.id || "",
                dataHora: prontuarioMedico.dataHora || "",
                descricao: prontuarioMedico.descricao || "",
                prescricao: prontuarioMedico.prescricao || "",
                pacienteId: prontuarioMedico.pacienteId?.toString() || "", 
                medicoId: prontuarioMedico.medicoId?.toString() || "",
                });
            })
            .catch((error) => {
                console.log("Erro ao carregar o prontuário médico:", error);
            });
        }
    }, [id]);

    const onSubmit = (e) => {
        e.preventDefault();
        if(formValid()){
            const updatedModel = { ...model };
            axiosClient.put(`/prontuarioMedico/update/${id}`, updatedModel)
                .then(()=>{
                    setModel({});
                    console.log("Prontuário Medico alterado com sucesso");
                    navigate('/prontuarioMedico/index')
            }).catch((error)=>{
                console.log(error);
            });
        }
        else{
            console.log("Não foi possível alterar o prontuario médico");
        }

    }

    return(
        <Fragment>
            <div className="display">
                <div className="card animated fadeinDown">
                    { model.id && <h1>Alteração do Prontuario Médico</h1> }

                    <form onSubmit={(e)=>onSubmit(e)}>
                        <div className="p-20">
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
                                value={model.prescricao}
                                placeholder="Prescrição"
                                handleChangeField={handleChangeField}
                                handleBlurField={handleBlurField}
                                error={error.prescricao}
                                mensagem={error.prescricaoMensagem}
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
                                { value: "", label: "Selecione o Paciente do prontuário" },
                                ...pacientes.map(paciente => ({
                                    value: paciente.id,
                                    label: `${paciente.id} - ${paciente.nome}`
                                }))
                            ]}
                        />                     
                        </div>
                        <div className="p-20">                          
                            <Select
                                id="medicoId"
                                value={model.medicoId}
                                handleChangeField={handleChangeField}
                                handleBlurField={handleBlurField}
                                error={error.medicoId}
                                mensagem={error.medicoIdMensagem}
                                options={[
                                    { value: "", label: "Selecione o Médico do prontuário" },
                                    ...medicos.map(medico => ({
                                        value: medico.id,
                                        label: `${medico.id} - ${medico.nome}`
                                    }))
                                ]}
                            />                     
                        </div>
                         <button className="btn btn-edit" to="/prontuarioMedico/index">Salvar</button>
                        <Link type="button" className="btn btn-cancel" to="/prontuarioMedico/index">
                            Cancelar
                        </Link>

                    </form>
                </div>
            </div>
        </Fragment>
    )
}
