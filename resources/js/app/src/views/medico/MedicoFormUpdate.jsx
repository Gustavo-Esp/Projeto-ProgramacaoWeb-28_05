import React, { Fragment, useEffect, useState } from 'react'
import axiosClient from '../../axiosClient';
import { Link, useNavigate, useParams } from 'react-router-dom';

function MedicoFormUpdate()
{
    const navigate = useNavigate();

    const [medico, setMedico] = useState({
        id:null,
        nome:'',
        especialidade:'',
        crm:'',
        telefone:'',
        email:'',
    });

    const {id} = useParams();

    if (id)
    {
        useEffect(() => {
            axiosClient.get(`/medico/show/${id}`)
            .then(({data}) =>{
                setMedico(data.data);
                //console.log(data.data);
            }).catch((error)=>{
                console.log(error);
            })
        },[id]);
    }

    // Pega informações do Servidor
    axiosClient.get(`/medico/show/${id}`)
                .then(({data})=>{
                   //console.log(data.data); 
                })
                .catch();

    // Função do tipo Anônima
    const onSubmit = (e) => {
        e.preventDefault();
        axiosClient.put(`/medico/update/${id}`, medico)
            .then(() =>{
                setMedico({});
                console.log('Medico alterado com sucesso');
                navigate('/medico/index')
            }).catch((error)=>{
                console.log(error);
            })
    }
    
    return(
        <Fragment>
            <div className="display">
                <div className="card animated fadeinDown">
                    {medico.id && <h1>Alteração de Medico: { medico.nome}</h1>}

                    <form onSubmit={(e)=>onSubmit(e)}>
                        <input
                            type="text"
                            value={medico.nome}
                            placeholder="Nome do Medico"
                            onChange={
                                e => setMedico({
                                    ...medico, nome:e.target.value
                                })
                            } />
                        <input
                            type="text"
                            value={medico.especialidade}
                            placeholder="Especialidade do Medico"
                            onChange={
                                e => setMedico({
                                    ...medico, especialidade:e.target.value
                              })
                            } />
                        <input
                            type="text"
                            value={medico.crm}
                            placeholder="CRM do Medico"
                            onChange={
                                e => setMedico({
                                    ...medico, crm:e.target.value
                                })
                            } />
                        <input
                            type="text"
                            value={medico.telefone}
                            placeholder="Telefone do Medico"
                            onChange={
                                e => setMedico({
                                    ...medico, telefone:e.target.value
                                })
                            } />
                        <input
                            type="text"
                            value={medico.email}
                            placeholder="Email do Medico"
                            onChange={
                                e => setMedico({
                                    ...medico, email:e.target.value
                                })
                            } />
                        <button className="btn btn-edit">Salvar</button>
                        <Link
                            type='button' 
                            className='btn btn-cancel'
                            to='/medico/index'>
                                Cancelar
                        </Link>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default MedicoFormUpdate