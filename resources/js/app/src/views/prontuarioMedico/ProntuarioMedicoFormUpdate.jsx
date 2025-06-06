import React, { Fragment, useEffect, useState } from 'react'
import axiosClient from '../../axiosClient';
import { Link, useNavigate, useParams } from 'react-router-dom';

function ProntuarioMedicoFormUpdate()
{
    const navigate = useNavigate();

    const [prontuarioMedico, setProntuarioMedico] = useState({
        id:null,
        dataHora:'',
        descricao:'',
        prescricao:'',
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
            axiosClient.get(`/prontuarioMedico/show/${id}`)
            .then(({data}) =>{
                setProntuarioMedico(data.data);
                //console.log(data.data);
            }).catch((error)=>{
                console.log(error);
            })
        },[id]);
    }

    // Pega informações do Servidor
    axiosClient.get(`/prontuarioMedico/show/${id}`)
                .then(({data})=>{
                   //console.log(data.data); 
                })
                .catch();

    // Função do tipo Anônima
    const onSubmit = (e) => {
        e.preventDefault();
        axiosClient.put(`/prontuarioMedico/update/${id}`, prontuarioMedico)
            .then(() =>{
                setProntuarioMedico({});
                console.log('Prontuário alterado com sucesso');
                navigate('/prontuarioMedico/index')
            }).catch((error)=>{
                console.log(error);
            })
    }
    
    return(
        <Fragment>
            <div className="display">
                <div className="card animated fadeinDown">
                    {prontuarioMedico.id && <h1>Alteração da data: { prontuarioMedico.dataHora}</h1> && <h1>Nome do medico atendente: { prontuarioMedico.medico?.nome}</h1>}

                    <form onSubmit={(e)=>onSubmit(e)}>
                        <input
                            type="text"
                            value={prontuarioMedico.dataHora}
                            placeholder="Data e hora do Prontuário"
                            onChange={
                                e => setProntuarioMedico({
                                    ...prontuarioMedico, dataHora:e.target.value
                                })
                            } />
                        <input
                            type="text"
                            value={prontuarioMedico.descricao}
                            placeholder="Descrição do Prontuário"
                            onChange={
                                e => setProntuarioMedico({
                                    ...prontuarioMedico, descricao:e.target.value
                              })
                            } />
                        <input
                            type="text"
                            value={prontuarioMedico.prescricao}
                            placeholder="Prescrição do Prontuário"
                            onChange={
                                e => setProntuarioMedico({
                                    ...prontuarioMedico, prescricao:e.target.value
                                })
                            } />
                        <button className="btn btn-edit">Salvar</button>
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

export default ProntuarioMedicoFormUpdate