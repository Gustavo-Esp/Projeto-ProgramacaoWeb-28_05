import React, { useEffect, useState } from 'react'
import axiosClient from '../../axiosClient';
import { Link } from 'react-router-dom';

export default function ProntuarioMedicoFormList()
{
    const [prontuariosMedicos, setProntuariosMedicos] = useState([]);

    // Função anômina na linguagem JavaScript
    const getProntuariosMedicos = () => {
        axiosClient
            .get('/prontuarioMedico/index')
            .then(({data}) => {
                //console.log(data.data);
                setProntuariosMedicos(data.data);
            })
            .catch((error)=>{
                console.log(error);
            });
    }

    useEffect(() => {
        getProntuariosMedicos();
    }, []);

    return(
        <div className="display">
            <div className="card animated fadeInDown">
                <div style={{
                    display:'flex',
                    justifyContent:'space-between',
                    alignItems:'center'
                }}>
                    <h1>Prontuários</h1> 
                    <Link to="/prontuarioMedico/store" className="btn-add">Store</Link>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>dataHora</th>
                            <th>descricao</th>
                            <th>prescricao</th>
                            <th>pacienteID</th>
                            <th>medicoID</th>
                            <th className="center actions" colSpan="3">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            prontuariosMedicos.length > 0 ? (
                                prontuariosMedicos && prontuariosMedicos.map((prontuarioMedico) => (
                                    <tr key={prontuarioMedico.id}>
                                        <td>{prontuarioMedico.id}</td>
                                        <td>{prontuarioMedico.dataHora}</td>
                                        <td>{prontuarioMedico.descricao}</td>
                                        <td>{prontuarioMedico.prescricao}</td>
                                        <td>{prontuarioMedico.pacienteID}</td>
                                        <td>{prontuarioMedico.medicoID}</td>
                                        <td>{prontuarioMedico.paciente?.nome}</td>
                                        <td>{prontuarioMedico.medico?.nome}</td>
                                        <td className="center actions">
                                            <Link className="btn-show" to={`/prontuarioMedico/show/${prontuarioMedico.id}`}>Show</Link>
                                        </td>
                                        <td className="center actions">
                                            <Link className="btn-edit" to={`/prontuarioMedico/update/${prontuarioMedico.id}`}>Update</Link>
                                        </td>  
                                        <td className="center actions">
                                            <Link className="btn-delete" to={`/prontuarioMedico/destroy/${prontuarioMedico.id}`}>Destroy</Link>
                                        </td> 
                                    </tr>
                                ))
                            ):(
                                <tr>
                                    <td>
                                        Nenhum registro localizado
                                    </td>
                                </tr>
                            )
                            
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

