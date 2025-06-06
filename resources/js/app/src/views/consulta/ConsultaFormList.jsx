import React, { useEffect, useState } from 'react'
import axiosClient from '../../axiosClient';
import { Link } from 'react-router-dom';

export default function ConsultaFormList()
{
    const [consultas, setConsultas] = useState([]);

    // Função anômina na linguagem JavaScript
    const getConsultas = () => {
        axiosClient
            .get('/consulta/index')
            .then(({data}) => {
                //console.log(data.data);
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
                            <th>ID</th>
                            <th>dataHora</th>
                            <th>motivo</th>
                            <th>status</th>
                            <th>pacienteID</th>
                            <th>medicoID</th>
                            <th className="center actions" colSpan="3">Ações</th>
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
                                        <td>{consulta.pacienteID}</td>
                                        <td>{consulta.medicoID}</td>
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

