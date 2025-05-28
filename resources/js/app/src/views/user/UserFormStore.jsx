
import { Fragment, useEffect, useState } from "react";
import axiosClient from "../../axiosClient";
import { useNavigate } from "react-router-dom";

export default function UserFormStore(){

  const navigate = useNavigate
  const [user, setUser] = useState({
    id: null,
    name: '',
    email: '',
    password:'',
  })

  if (id){
    useEffect(() => {
      axiosClient.post('/user/store', user)
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
      console.log('Usuário incluido com sucesso');
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
          { user.id && <h1>Inclusão do Usuario de usuário</h1>}
        </div>

        <form onSubmit={(e)=>onSubmit(e)}>
          <input 
          type="text"
          value={user.name} 
          placeholder="Nome" 
          onChange={
            e => setUser ({
              ...user, name:e.target.value
            })
          }
          />

          <input 
          type="password"
          value={user.password} 
            placeholder="Senha" 
            onChange={
              e => setUser ({
                ...user, password:e.target.value
              })
            }
          />
          
          <input 
          type="text"
          value={user.email} placeholder="E-mail" 
          onChange={
            e => setUser ({
              ...user, name:e.target.value
            })
          }readOnly={true}/>

          <button className="btn-add">Salvar</button>
          <Link type="btn btn-cancel" to = "/user/index">Cancelar</Link>

        </form>

      </div>
    </Fragment>
  )
}