
import { Fragment, useEffect, useState } from "react";
import axiosClient from "../../axiosClient";
import { useNavigate, useParams } from "react-router-dom";

export default function UserFormUpdate(){

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
    axiosClient.put(`/user/update/${id}`, user).
    then(()=> {
      setUser({});
      console.log('Usuário alterado com sucesso');
      navigate('/user/index');
    }).catch((error)=> {
      console.log(error);
    });
    
  }

  const onCancel = () => {
    navigate('/user/index');
  }

  return (
    <Fragment>
      <div className="display">

        <div className="card animated fadeinDown">
          { user.id && <h1>Alteração do Usuario de usuário: { user.name}</h1>}
        </div>

        <form onSubmit={(e)=>onSubmit(e)}>
          <input value={user.name} 
          placeholder="Nome do Usuário" 
          onChange={
            e => setUser({
              ...user, name:e.target.value
            })
          }
          />
          <input value={user.email} placeholder="E-mail do Usuário" 
          onChange={
            e => setUser ({
              ...user, name:e.target.value
            })
          }readOnly={true}/>

          <button className="btn btn-edit">Salvar</button>
          <Link type="btn btn-cancel" to = "/user/index">Cancelar</Link>

        </form>

      </div>
    </Fragment>
  )
}