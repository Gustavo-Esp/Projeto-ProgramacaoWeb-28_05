import React, { useEffect, useState } from 'react'
import axiosClient from '../../axiosClient';
import { Link } from 'react-router-dom';

export default function PacienteFormList()
{
    const [pacientes, setPacientes] = useState([]);

    // Função anômina na linguagem JavaScript
    const getPacientes = () => {
        axiosClient
            .get('/paciente/index')
            .then(({data}) => {
                //console.log(data.data);
                setPacientes(data.data);
            })
            .catch((error)=>{
                console.log(error);
            });
    }

    useEffect(() => {
        getPacientes();
    }, []);

    //console.log(users);

    return(
        <div className="display">
            <div className="card animated fadeInDown">
                <div style={{
                    display:'flex',
                    justifyContent:'space-between',
                    alignItems:'center'
                }}>
                    <h1>Pacientes</h1> 
                    <Link to="/paciente/store" className="btn-add">Store</Link>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Data de Nascimento</th>
                            <th>Endereco</th>
                            <th>Telefone</th>
                            <th>Email</th>
                            <th className="center actions" colSpan="3">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            pacientes.length > 0 ? (
                                pacientes && pacientes.map((paciente) => (
                                    <tr key={paciente.id}>
                                        <td>{paciente.id}</td>
                                        <td>{paciente.nome}</td>
                                        <td>{paciente.dataNascimento}</td>
                                        <td>{paciente.enreco}</td>
                                        <td>{paciente.telefone}</td>
                                        <td>{paciente.email}</td>
                                        <td className="center actions">
                                            <Link className="btn-show" to={`/paciente/show/${paciente.id}`}>Show</Link>
                                        </td>
                                        <td className="center actions">
                                            <Link className="btn-edit" to={`/paciente/update/${paciente.id}`}>Update</Link>
                                        </td>  
                                        <td className="center actions">
                                            <Link className="btn-delete" to={`/paciente/destroy/${paciente.id}`}>Destroy</Link>
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

