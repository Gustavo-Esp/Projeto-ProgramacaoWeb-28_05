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

    useEffect(()=>{
        if (id){
            
            axiosClient.get(`/consulta/show/${id}`)
            .then(({data})=>{
                setConsulta(data.data);
            }).catch((error)=>{
                console.log(error);
            });
        }
    },[id]);

    // Função do tipo Anônima
    const onSubmit = (e) => {
        e.preventDefault();
        navigate('/consulta/index');
    }
    
    return(
        <Fragment>
            <div className="display">
                <div className="card animated fadeInDown">
                    {consulta.id && (
                    <>
                        <h1>Data da consulta: {consulta.dataHora}</h1>
                        <h1>Médico atendente: {consulta.medico?.nome}</h1>
                    </>
                    )}

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
        </div>
        </Fragment>
    )
}

export default ConsultaFormShow