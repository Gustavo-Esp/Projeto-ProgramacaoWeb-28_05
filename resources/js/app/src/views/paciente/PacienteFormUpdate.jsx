import React, { Fragment, useEffect, useState } from 'react'
import axiosClient from '../../axiosClient';
import { Link, useNavigate, useParams } from 'react-router-dom';

function PacienteFormUpdate()
{
    const navigate = useNavigate();

    const [paciente, setPaciente] = useState({
        id:null,
        nome:'',
        dataNascimento:'',
        endereco:'',
        telefone:'',
        email:'',
    });

    const {id} = useParams();

    if (id)
    {
        useEffect(() => {
            axiosClient.get(`/paciente/show/${id}`)
            .then(({data}) =>{
                setPaciente(data.data);
                //console.log(data.data);
            }).catch((error)=>{
                console.log(error);
            })
        },[id]);
    }

    // Pega informações do Servidor
    axiosClient.get(`/paciente/show/${id}`)
                .then(({data})=>{
                   //console.log(data.data); 
                })
                .catch();

    // Função do tipo Anônima
    const onSubmit = (e) => {
        e.preventDefault();
        axiosClient.put(`/paciente/update/${id}`, paciente)
            .then(() =>{
                setPaciente({});
                console.log('Paciente alterado com sucesso');
                navigate('/paciente/index')
            }).catch((error)=>{
                console.log(error);
            })
    }
    
    return(
        <Fragment>
            <div className="display">
                <div className="card animated fadeinDown">
                    {paciente.id && <h1>Alteração de Paciente: { paciente.nome}</h1>}

                    <form onSubmit={(e)=>onSubmit(e)}>
                        <input
                            type="text"
                            value={paciente.nome}
                            placeholder="Nome do Paciente"
                            onChange={
                                e => setPaciente({
                                    ...paciente, nome:e.target.value
                                })
                            } />
                        <input
                            type="text"
                            value={paciente.dataNascimento}
                            placeholder="Data de Nascimento do Paciente"
                            onChange={
                                e => setPaciente({
                                    ...paciente, dataNascimento:e.target.value
                              })
                            } />
                        <input
                            type="text"
                            value={paciente.endereco}
                            placeholder="Endereço do Paciente"
                            onChange={
                                e => setPaciente({
                                    ...paciente, endereco:e.target.value
                                })
                            } />
                        <input
                            type="text"
                            value={paciente.telefone}
                            placeholder="Telefone do Paciente"
                            onChange={
                                e => setPaciente({
                                    ...paciente, telefone:e.target.value
                                })
                            } />
                        <input
                            type="text"
                            value={paciente.email}
                            placeholder="Email do Paciente"
                            onChange={
                                e => setPaciente({
                                    ...paciente, email:e.target.value
                                })
                            } />
                        <button className="btn btn-edit">Salvar</button>
                        <Link
                            type='button' 
                            className='btn btn-cancel'
                            to='/paciente/index'>
                                Cancelar
                        </Link>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default PacienteFormUpdate