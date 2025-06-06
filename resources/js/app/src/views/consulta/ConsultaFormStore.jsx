import React, { Fragment, useEffect, useState } from 'react'
import axiosClient from '../../axiosClient';
import { Link, useNavigate, useParams } from 'react-router-dom';

function ConsultaFormStore()
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

    // Função do tipo Anônima
    const onSubmit = (e) => {
        e.preventDefault();
        axiosClient.post(`/consulta/store`, consulta)
            .then(() =>{
                setConsulta({});
                console.log('Consulta incluída com sucesso');
                navigate('/consulta/index')
            }).catch((error)=>{
                console.log(error);
            })
    }
    
    return(
        <Fragment>
            <div className="display">
                <div className="card animated fadeinDown">
                    <h1>Inclusão de Consulta</h1>

                    <form onSubmit={(e)=>onSubmit(e)}>
                        <input
                            type="text"
                            value={consulta.dataHora}
                            placeholder="Data e hora da consulta"
                            onChange={
                                e => setConsulta({
                                    ...consulta, dataHora:e.target.value
                                })
                            } />
                        <input
                            type="text"
                            value={consulta.motivo}
                            placeholder="Motivo da consulta"
                            onChange={
                                e => setConsulta({
                                    ...consulta, motivo:e.target.value
                              })
                            } />
                        <input
                            type="text"
                            value={consulta.status}
                            placeholder="Status da consulta"
                            onChange={
                                e => setConsulta({
                                    ...consulta, status:e.target.value
                                })
                            } />
                        <button className="btn btn-edit">Salvar</button>
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
