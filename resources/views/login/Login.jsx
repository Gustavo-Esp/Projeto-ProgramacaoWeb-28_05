import {useState} from 'react';
import {Link} from 'react-router-dom'

export default function Login(){

  const emailRef = createRef();
  const passwordRef = createRef();
  const onSubmit = (e) => {
    e.preventDefault();
    console.log('passando pelo onsubmit ');


    const login = {
      email: emailRef.current.value,
      password: passwordRef.current.value
    }

    axiosCliente.post('/login', login)
          .then(({data})=>{
            console.log(data);
          })
          .catch((erro)=>{
            console.log(erro);
          })
    setMessage = ('login realizado com sucesso' + login);

  }
  const [message, setMessage] = useState(null);

  return(
      <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title p-20">Acesso ao Sistema com sua conta</h1>
          {
            message &&
            <div className="alert">
              <p>{message}</p>
            </div>
          }

          <input type="text" placeholder='E-mail' className='p-20' ref = {emailRef}/>
          <input type="password" placeholder='Senha' className='p-20' ref = {passwordRef}/>
          <button className='btn btn-block p-20'>Login</button>
          <p className='message'>Não está Registrado<Link to="/register">Criar nova Conta</Link></p>
        </form>
     </div>
    </div>
  )
}