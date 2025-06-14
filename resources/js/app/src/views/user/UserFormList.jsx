import React, { useEffect, useState } from 'react'
import axiosClient from '../../axiosClient';
import { Link } from 'react-router-dom';

export default function UserFormList()
{
    const [users, setUsers] = useState([]);

    const getUsers = () => {
        axiosClient
            .get('/user/index')
            .then(({data}) => {
                setUsers(data.data);
            })
            .catch((error)=>{
                console.log(error);
            });
    }

    useEffect(() => {
        getUsers();
    }, []);

    return(
        <div className="display">
            <div className="card animated fadeInDown">
                <div style={{
                    display:'flex',
                    justifyContent:'space-between',
                    alignItems:'center'
                }}>
                    <h1>Usuários</h1> 
                    <Link to="/user/store" className="btn-add">Store</Link>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th className="col-id">Id</th>
                            <th className="col-nome">Nome</th>
                            <th className="col-email">Email</th>
                            <th className='center actions' colSpan={3}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.length > 0 ? (
                                users && users.map((user) => (
                                    <tr key={user.id}>
                                        <td className="col-id">{user.id}</td>
                                        <td className="col-nome">{user.name}</td>
                                        <td className="col-email">{user.email}</td>
                                        <td className="center actions">
                                            <Link className="btn-show" to={`/user/show/${user.id}`}>Show</Link>
                                        </td>
                                        <td className="center actions">
                                            <Link className="btn-edit" to={`/user/update/${user.id}`}>Update</Link>
                                        </td>  
                                        <td className="center actions">
                                            <Link className="btn-delete" to={`/user/destroy/${user.id}`}>Destroy</Link>
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

