import React, { useEffect, useState } from 'react'
import axiosClient from '../../axiosClient';
import { Link } from 'react-router-dom';

export default function ConsultaFormList()
{
    const [consultas, setConsultas] = useState([]);

    const getConsultas = () => {
        axiosClient
            .get('/consulta/index')
            .then(({data}) => {
                setConsultas(data.data);
            })
            .catch((error)=>{
                console.log(error);
            });
    }

    useEffect(() => {
        getConsultas();
    }, []);

    return(
        <div className="display">
            <div className="card animated fadeInDown">
                <div style={{
                    display:'flex',
                    justifyContent:'space-between',
                    alignItems:'center'
                }}>
                    <h1>Consultas</h1> 
                    <Link to="/consulta/store" className="btn-add">Store</Link>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th className="col-id">Id</th>
                            <th className="col-dataHora">Data da Consulta</th>
                            <th className="col-motivo">Motivo</th>
                            <th className="col-status">Status</th>
                            <th className="col-paciente-nome">Paciente</th>
                            <th className="col-medico-nome">Médico</th>
                            <th className='center actions' colSpan={3}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            consultas.length > 0 ? (
                                consultas && consultas.map((consulta) => (
                                    <tr key={consulta.id}>
                                        <td>{consulta.id}</td>
                                        <td>{consulta.dataHora}</td>
                                        <td>{consulta.motivo}</td>
                                        <td>{consulta.status}</td>
                                        <td>{consulta.paciente?.nome}</td>
                                        <td>{consulta.medico?.nome}</td>
                                        <td className="center actions">
                                            <Link className="btn-show" to={`/consulta/show/${consulta.id}`}>Show</Link>
                                        </td>
                                        <td className="center actions">
                                            <Link className="btn-edit" to={`/consulta/update/${consulta.id}`}>Update</Link>
                                        </td>  
                                        <td className="center actions">
                                            <Link className="btn-delete" to={`/consulta/destroy/${consulta.id}`}>Destroy</Link>
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

