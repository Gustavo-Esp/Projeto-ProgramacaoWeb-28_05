import React, { Fragment, useEffect, useState } from 'react'
import axiosClient from '../../axiosClient';
import { useNavigate, useParams } from 'react-router-dom';

function PacienteFormShow()
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
    console.log(id);

    if (id)
    {
        useEffect(() => {
            axiosClient.get(`/paciente/show/${id}`)
            .then(({data}) =>{
                setPaciente(data.data);
                console.log(data.data);
            }).catch((error)=>{
                console.log(error);
            })
        },[id]);
    }

    // Função do tipo Anônima
    const onSubmit = (e) => {
        e.preventDefault();
        navigate('/paciente/index');
    }
    
    return(
        <Fragment>
            <div className="display">
                <div className="card animated fadeInDown">
                    {paciente.id && <h1>Consulta de Paciente: { paciente.nome}</h1>}
                </div>

                <form>
                    <input defaultValue={paciente.nome} placeholder="Nome do Paciente" readOnly={true}/>
                    <input defaultValue={paciente.dataNascimento} placeholder="Data de Nascimento do Paciente" readOnly={true}/>
                    <input defaultValue={paciente.endereco} placeholder="Endereço do Paciente" readOnly={true}/>
                    <input defaultValue={paciente.telefone} placeholder="Telefone do Paciente" readOnly={true}/>
                    <input defaultValue={paciente.email} placeholder="Email do Paciente" readOnly={true}/>
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

export default PacienteFormShow