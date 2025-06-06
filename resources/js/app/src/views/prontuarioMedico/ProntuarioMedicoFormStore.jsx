import React, { Fragment, useEffect, useState } from 'react'
import axiosClient from '../../axiosClient';
import { Link, useNavigate, useParams } from 'react-router-dom';

function ProntuarioMedicoFormStore()
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

    // Função do tipo Anônima
    const onSubmit = (e) => {
        e.preventDefault();
        axiosClient.post(`/prontuarioMedico/store`, prontuarioMedico)
            .then(() =>{
                setProntuarioMedico({});
                console.log('Prontuário incluído com sucesso');
                navigate('/prontuarioMedico/index')
            }).catch((error)=>{
                console.log(error);
            })
    }
    
    return(
        <Fragment>
            <div className="display">
                <div className="card animated fadeinDown">
                    <h1>Inclusão do Prontuário</h1>

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

export default ProntuarioMedicoFormStore
