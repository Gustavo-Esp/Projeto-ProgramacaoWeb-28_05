import React, { Fragment, useEffect, useState } from 'react'
import axiosClient from '../../axiosClient';
import { useNavigate, useParams } from 'react-router-dom';

function UserFormShow()
{
    const navigate = useNavigate();

    const [user, setUser] = useState({
        id:null,
        name:'',
        email:''
    });

    const {id} = useParams();
    console.log(id);

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

    // Função do tipo Anônima
    const onSubmit = (e) => {
        e.preventDefault();
        navigate('/user/index');
        //console.log(e);
        //console.log("Passando pela função onSubmit")
    }
    
    return(
        <Fragment>
            <div className="display">
                <div className="card animated fadeInDown">
                    {user.id && <h1>Consulta de Usuário: { user.name}</h1>}
                </div>

                <form>
                    <input defaultValue={user.name} placeholder="Nome do Usuário" readOnly={true}/>
                    <input defaultValue={user.email} placeholder="Email do Usuário" readOnly={true}/>
                    <button
                        className="btn"
                        onClick={(e)=>onSubmit(e)}>
                        Cancelar
                    </button>
                </form>
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

export default UserFormShow