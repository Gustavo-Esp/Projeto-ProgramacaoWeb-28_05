import React, { Fragment, useEffect, useState } from 'react'
import axiosClient from '../../axiosClient';
import { useNavigate, useParams } from 'react-router-dom';

function ConsultaFormShow()
{
    const navigate = useNavigate();

    const [consulta, setConsulta] = useState({
        id:null,
        dataHora:'',
        status:'',
        motivo:'',
        medicoID:'',
        pacienteID:'',
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
            axiosClient.get(`/consulta/show/${id}`)
            .then(({data}) =>{
                setConsulta(data.data);
                console.log(data.data);
            }).catch((error)=>{
                console.log(error);
            })
        },[id]);
    }

    // Função do tipo Anônima
    const onSubmit = (e) => {
        e.preventDefault();
        navigate('/consulta/index');
    }
    
    return(
        <Fragment>
            <div className="display">
                <div className="card animated fadeInDown">
                    {consulta.id && <h1>data da consulta: { consulta.dataHora}</h1> && <h1>medico atendente: { consulta.medico?.nome}</h1>}
                </div>

                <form>
                    <input defaultValue={consulta.dataHora} placeholder="Data e hora da consulta" readOnly={true}/>
                    <input defaultValue={consulta.motivo} placeholder="Motivo da consulta" readOnly={true}/>
                    <input defaultValue={consulta.status} placeholder="Status da consulta" readOnly={true}/>
                    <input defaultValue={consulta.medico?.nome} placeholder="Nome do Médico" readOnly={true}/>
                    <input defaultValue={consulta.paciente?.nome} placeholder="Nome do Paciente" readOnly={true}/>
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

export default ConsultaFormShow