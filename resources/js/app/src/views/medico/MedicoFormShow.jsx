import React, { Fragment, useEffect, useState } from 'react'
import axiosClient from '../../axiosClient';
import { useNavigate, useParams } from 'react-router-dom';

function MedicoFormShow()
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
    console.log(id);

    if (id)
    {
        useEffect(() => {
            axiosClient.get(`/medico/show/${id}`)
            .then(({data}) =>{
                setMedico(data.data);
                console.log(data.data);
            }).catch((error)=>{
                console.log(error);
            })
        },[id]);
    }

    // Função do tipo Anônima
    const onSubmit = (e) => {
        e.preventDefault();
        navigate('/medico/index');
    }
    
    return(
        <Fragment>
            <div className="display">
                <div className="card animated fadeInDown">
                    {medico.id && <h1>Consulta de Medico: { medico.nome}</h1>}
                </div>

                <form>
                    <input defaultValue={medico.nome} placeholder="Nome do Medico" readOnly={true}/>
                    <input defaultValue={medico.especialidade} placeholder="Especialidade do medico" readOnly={true}/>
                    <input defaultValue={medico.crm} placeholder="CRM do Medico" readOnly={true}/>
                    <input defaultValue={medico.telefone} placeholder="Telefone do Medico" readOnly={true}/>
                    <input defaultValue={medico.email} placeholder="Email do Medico" readOnly={true}/>
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

export default MedicoFormShow