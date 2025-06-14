import React, { Fragment, useEffect, useState } from 'react'
import axiosClient from '../../axiosClient';
import { Link, useNavigate, useParams } from 'react-router-dom';

function MedicoFormDestroy()
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
                console.log(data.data);
            }).catch((error)=>{
                console.log(error);
            })
        },[id]);
    }

    // Função do tipo Anônima
    const onSubmit = (e) => {
        e.preventDefault();
        axiosClient.delete(`/medico/destroy/${id}`)
            .then(() =>{
                setMedico({});
                console.log('Medico excluído com sucesso');
                navigate('/medico/index')
            }).catch((error)=>{
                console.log(error);
            })
    }
    
    return(
        <Fragment>
            <div className="display">
                <div className="card animated fadeinDown">
                    {medico.id && <h1>Exclusão de Medico: { medico.nome}</h1>}

                    <form onSubmit={(e)=>onSubmit(e)}>
                        <input defaultValue={medico.nome} placeholder="Nome do Medico" readOnly={true}/>
                        <input defaultValue={medico.especialidade} placeholder="Especialidade do medico" readOnly={true}/>
                        <input defaultValue={medico.crm} placeholder="CRM do medico" readOnly={true}/>
                        <input defaultValue={medico.telefone} placeholder="Telefone do Medico" readOnly={true}/>
                        <input defaultValue={medico.email} placeholder="Email do Medico" readOnly={true}/>
                        <button className="btn btn-delete">Excluir</button>
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

export default MedicoFormDestroy