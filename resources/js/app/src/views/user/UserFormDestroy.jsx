import React, { Fragment, useEffect, useState } from 'react'
import axiosClient from '../../axiosClient';
import { Link, useNavigate, useParams } from 'react-router-dom';

function UserFormDestroy()
{
    const navigate = useNavigate();

    const [user, setUser] = useState({
        id:null,
        name:'',
        email:'',
    });

    const {id} = useParams();

    if (id)
    {
        useEffect(() => {
            axiosClient.get(`/user/show/${id}`)
            .then(({data}) =>{
                setUser(data.data);
                console.log(data.data);
            }).catch((error)=>{
                console.log(error);
            })
        },[id]);
    }

    // Pega informações do Servidor
    axiosClient.get(`/user/show/${id}`)
                .then(({data})=>{
                   console.log(data.data); 
                })
                .catch();

    // Função do tipo Anônima
    const onSubmit = (e) => {
        e.preventDefault();
        axiosClient.delete(`/user/destroy/${id}`)
            .then(() =>{
                setUser({});
                console.log('Usuário excluído com sucesso');
                navigate('/user/index')
            }).catch((error)=>{
                console.log(error);
            })
        //console.log(e);
        //console.log("Passando pela função onSubmit")
    }

    const onCancel = (e) => {
        //e.preventDefault();
        navigate('/user/index');
        //console.log(e);
        //console.log("Passando pela função onSubmit")
    }


    
    return(
        <Fragment>
            <div className="display">
                <div className="card animated fadeinDown">
                    {user.id && <h1>Exclusão de Usuário: { user.name}</h1>}

                    <form onSubmit={(e)=>onSubmit(e)}>
                        <input defaultValue={user.name} placeholder="Nome do Usuário" readOnly={true}/>
                        <input defaultValue={user.email} placeholder="Email do Usuário" readOnly={true}/>
                        <button className="btn btn-delete">Excluir</button>
                        <Link
                            type='button' 
                            className='btn btn-cancel'
                            to='/user/index'>
                                Cancelar
                        </Link>
                    </form>
                </div>

                
            </div>
        </Fragment>

        /*
        OU
        Div
        <div>

        </div>

        OU

        Fragmento Vazio
        <>
        </>
        */
    )
}

export default UserFormDestroy