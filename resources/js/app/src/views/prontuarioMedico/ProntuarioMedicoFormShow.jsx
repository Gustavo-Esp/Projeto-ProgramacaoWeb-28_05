import React, { Fragment, useEffect, useState } from 'react'
import axiosClient from '../../axiosClient';
import { useNavigate, useParams } from 'react-router-dom';

function ProntuarioMedicoFormShow()
{
    const navigate = useNavigate();

    const [prontuarioMedico, setProntuarioMedico] = useState({
        id:null,
        dataHora:'',
        descricao:'',
        prescricao:'',
        medicoId:'',
        pacienteId:'',
        medico: {
          nome:'',
        },
        paciente: {
          nome:'',
        }
    });

    const {id} = useParams();
    console.log(id);

    if (id)
    {
        useEffect(() => {
            axiosClient.get(`/prontuarioMedico/show/${id}`)
            .then(({data}) =>{
                setProntuarioMedico(data.data);
                console.log(data.data);
            }).catch((error)=>{
                console.log(error);
            })
        },[id]);
    }

    // Função do tipo Anônima
    const onSubmit = (e) => {
        e.preventDefault();
        navigate('/prontuarioMedico/index');
    }
    
    return(
        <Fragment>
            <div className="display">
                <div className="card animated fadeInDown">
                    {prontuarioMedico.id && <h1>data do prontuário: { prontuarioMedico.dataHora}</h1> && <h1>medico responsável: { prontuarioMedico.medico?.nome}</h1>}
                </div>

                <form>
                    <input defaultValue={prontuarioMedico.dataHora} placeholder="Data e hora do prontuário" readOnly={true}/>
                    <input defaultValue={prontuarioMedico.descricao} placeholder="Descrição do prontuário" readOnly={true}/>
                    <input defaultValue={prontuarioMedico.prescricao} placeholder="Prescrição do prontuário" readOnly={true}/>
                    <input defaultValue={prontuarioMedico.medico?.nome} placeholder="Nome do Médico" readOnly={true}/>
                    <input defaultValue={prontuarioMedico.paciente?.nome} placeholder="Nome do Paciente" readOnly={true}/>
                    <button
                        className="btn"
                        onClick={(e)=>onSubmit(e)}>
                        Cancelar
                    </button>
                </form>
            </div>
        </Fragment>
    )
}

export default ProntuarioMedicoFormShow