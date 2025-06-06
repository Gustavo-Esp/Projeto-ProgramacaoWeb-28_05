import React, { Fragment, useEffect, useState } from 'react'
import axiosClient from '../../axiosClient';
import { Link, useNavigate, useParams } from 'react-router-dom';

function PacienteFormDestroy()
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
            axiosClient.get(`/user/show/${id}`)
            .then(({data}) =>{
                setPaciente(data.data);
                console.log(data.data);
            }).catch((error)=>{
                console.log(error);
            })
        },[id]);
    }

    // Pega informações do Servidor
    axiosClient.get(`/paciente/show/${id}`)
                .then(({data})=>{
                   console.log(data.data); 
                })
                .catch();

    // Função do tipo Anônima
    const onSubmit = (e) => {
        e.preventDefault();
        axiosClient.delete(`/paciente/destroy/${id}`)
            .then(() =>{
                setPaciente({});
                console.log('Paciente excluído com sucesso');
                navigate('/paciente/index')
            }).catch((error)=>{
                console.log(error);
            })
    }
    
    return(
        <Fragment>
            <div className="display">
                <div className="card animated fadeinDown">
                    {paciente.id && <h1>Exclusão de Paciente: { paciente.nome}</h1>}

                    <form onSubmit={(e)=>onSubmit(e)}>
                        <input defaultValue={paciente.nome} placeholder="Nome do Paciente" readOnly={true}/>
                        <input defaultValue={paciente.dataNascimento} placeholder="Data de nascimento do Paciente" readOnly={true}/>
                        <input defaultValue={paciente.email} placeholder="Email do Paciente" readOnly={true}/>
                        <input defaultValue={paciente.telefone} placeholder="Telefone do Paciente" readOnly={true}/>
                        <input defaultValue={paciente.endereco} placeholder="Endereço do Paciente" readOnly={true}/>
                        <button className="btn btn-delete">Excluir</button>
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

export default PacienteFormDestroy