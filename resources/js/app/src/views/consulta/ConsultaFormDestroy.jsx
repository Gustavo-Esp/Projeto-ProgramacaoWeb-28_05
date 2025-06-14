import React, { Fragment, useEffect, useState } from 'react'
import axiosClient from '../../axiosClient';
import { Link, useNavigate, useParams } from 'react-router-dom';

function ConsultaFormDestroy()
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
        axiosClient.delete(`/consulta/destroy/${id}`)
            .then(() =>{
                setConsulta({});
                console.log('Consulta excluída com sucesso');
                navigate('/consulta/index')
            }).catch((error)=>{
                console.log(error);
            })
    }
    
    return(
        <Fragment>
            <div className="display">
                <div className="card animated fadeinDown">
                    {consulta.id && <h1>Exclusão de Consulta: { consulta.dataHora}</h1> && <h1>Nome do médico atendente: { consulta.medico?.nome}</h1>}

                    <form onSubmit={(e)=>onSubmit(e)}>
                        <input defaultValue={consulta.dataHora} placeholder="Horário da Consulta" readOnly={true}/>
                        <input defaultValue={consulta.motivo} placeholder="motivo da consulta" readOnly={true}/>
                        <input defaultValue={consulta.status} placeholder="Status da consulta" readOnly={true}/>
                        <button className="btn btn-delete">Excluir</button>
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

export default ConsultaFormDestroy