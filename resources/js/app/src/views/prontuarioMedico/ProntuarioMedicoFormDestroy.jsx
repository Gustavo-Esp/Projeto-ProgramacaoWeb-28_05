import React, { Fragment, useEffect, useState } from 'react'
import axiosClient from '../../axiosClient';
import { Link, useNavigate, useParams } from 'react-router-dom';

function ProntuarioMedicoFormDestroy()
{
    const navigate = useNavigate();

    const [prontuarioMedico, setProntuarioMedico] = useState({
        id:null,
        dataHora:'',
        descricao:'',
        prescricao:'',
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
            axiosClient.get(`/prontuarioMedico/show/${id}`)
            .then(({data}) =>{
                setProntuarioMedico(data.data);
                console.log(data.data);
            }).catch((error)=>{
                console.log(error);
            })
        },[id]);
    }

    // Função do tipo Anônima
    const onSubmit = (e) => {
        e.preventDefault();
        axiosClient.delete(`/prontuarioMedico/destroy/${id}`)
            .then(() =>{
                setProntuarioMedico({});
                console.log('Prontuário medico excluída com sucesso');
                navigate('/prontuarioMedico/index')
            }).catch((error)=>{
                console.log(error);
            })
    }
    
    return(
        <Fragment>
            <div className="display">
                <div className="card animated fadeinDown">
                    {prontuarioMedico.id && <h1>Exclusão de Prontuário Medico: { prontuarioMedico.dataHora }</h1> && <h1>Nome do médico atendente: { prontuarioMedico.medico?.nome }</h1>}

                    <form onSubmit={(e)=>onSubmit(e)}>
                        <input defaultValue={prontuarioMedico.dataHora} placeholder="Horário da criação do prontuario" readOnly={true}/>
                        <input defaultValue={prontuarioMedico.prescricao} placeholder="Prescrição" readOnly={true}/>
                        <input defaultValue={prontuarioMedico.descricao} placeholder="Descrição" readOnly={true}/>
                        <button className="btn btn-delete">Excluir</button>
                        <Link
                            type='button' 
                            className='btn btn-cancel'
                            to='/prontuarioMedico/index'>
                                Cancelar
                        </Link>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default ProntuarioMedicoFormDestroy