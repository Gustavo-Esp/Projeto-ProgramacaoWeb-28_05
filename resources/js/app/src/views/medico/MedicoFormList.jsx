import React, { useEffect, useState } from 'react'
import axiosClient from '../../axiosClient';
import { Link } from 'react-router-dom';

export default function MedicoFormList()
{
    const [medicos, setMedicos] = useState([]);

    // Função anômina na linguagem JavaScript
    const getMedicos = () => {
        axiosClient
            .get('/medico/index')
            .then(({data}) => {
                //console.log(data.data);
                setMedicos(data.data);
            })
            .catch((error)=>{
                console.log(error);
            });
    }

    useEffect(() => {
        getMedicos();
    }, []);

    return(
        <div className="display">
            <div className="card animated fadeInDown">
                <div style={{
                    display:'flex',
                    justifyContent:'space-between',
                    alignItems:'center'
                }}>
                    <h1>Medicos</h1> 
                    <Link to="/medico/store" className="btn-add">Store</Link>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Especialidade</th>
                            <th>CRM</th>
                            <th>Telefone</th>
                            <th>Email</th>
                            <th className="center actions" colSpan="3">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            medicos.length > 0 ? (
                                medicos && medicos.map((medico) => (
                                    <tr key={medico.id}>
                                        <td>{medico.id}</td>
                                        <td>{medico.nome}</td>
                                        <td>{medico.especialidade}</td>
                                        <td>{medico.crm}</td>
                                        <td>{medico.telefone}</td>
                                        <td>{medico.email}</td>
                                        <td className="center actions">
                                            <Link className="btn-show" to={`/medico/show/${medico.id}`}>Show</Link>
                                        </td>
                                        <td className="center actions">
                                            <Link className="btn-edit" to={`/medico/update/${medico.id}`}>Update</Link>
                                        </td>  
                                        <td className="center actions">
                                            <Link className="btn-delete" to={`/medico/destroy/${medico.id}`}>Destroy</Link>
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

