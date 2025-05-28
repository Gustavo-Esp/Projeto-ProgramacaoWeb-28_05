
import { Fragment, useEffect, useState } from "react";
import axiosClient from "../../axiosClient";
import { useNavigate, useParams } from "react-router-dom";

export default function UserFormShow(){

  const navigate = useNavigate
  const [user, setUser] = useState({
    id: null,
    name: '',
    email: '',
  })

  const { id } = useParams();

  if (id){
    useEffect(() => {
      axiosClient.get(`/user/show/${id}`).
      then(({ data })=> {
        //console.log(data.data);
        setUser(data.data);
      }).catch((error)=> {
        console.log(error);
      });
    }, [id]);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    navigate('/user/index');
    
  }

  return (
    <Fragment>
      <div className="display">

        <div className="card animated fadeinDown">
          { user.id && <h1>Consulta de usuário: { user.name}</h1>}
        </div>

        <form onSubmit={(e)=>onSubmit(e)}>
          <input defaultValue={user.name} placeholder="Nome do Usuário" readOnly={true}/>
          <input defaultValue={user.email} placeholder="E-mail do Usuário" readOnly={true}/>

          <button className="btn" onClick={(e)=>onSubmit(e)}>Cancelar</button>

        </form>

      </div>
    </Fragment>
  )
}