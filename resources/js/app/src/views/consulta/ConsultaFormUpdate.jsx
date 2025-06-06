import React, { Fragment, useEffect, useState } from 'react'
import axiosClient from '../../axiosClient';
import { Link, useNavigate, useParams } from 'react-router-dom';

function ConsultaFormUpdate()
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

    if (id)
    {
        useEffect(() => {
            axiosClient.get(`/consulta/show/${id}`)
            .then(({data}) =>{
                setConsulta(data.data);
                //console.log(data.data);
            }).catch((error)=>{
                console.log(error);
            })
        },[id]);
    }

    // Pega informações do Servidor
    axiosClient.get(`/consulta/show/${id}`)
                .then(({data})=>{
                   //console.log(data.data); 
                })
                .catch();

    // Função do tipo Anônima
    const onSubmit = (e) => {
        e.preventDefault();
        axiosClient.put(`/consulta/update/${id}`, consulta)
            .then(() =>{
                setConsulta({});
                console.log('Consulta alterada com sucesso');
                navigate('/consulta/index')
            }).catch((error)=>{
                console.log(error);
            })
    }
    
    return(
        <Fragment>
            <div className="display">
                <div className="card animated fadeinDown">
                    {consulta.id && <h1>Alteração da data: { consulta.dataHora}</h1> && <h1>Nome do medico atendente: { consulta.medico?.nome}</h1>}

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

export default ConsultaFormUpdate