import {useState} from 'react';
import {Link} from 'react-router-dom'
export default function forgotPassword(){
  return(
    <div className="login-signup-form animated fadeInDown">
    <div className="form">
      <form>
        <h1 className="title">Recuperar Senha</h1>
        {
          message &&
          <div className="alert">
            <p>{message}</p>
          </div>
        }
        <input type="text" placeholder='E-mail'/>
        <button className='btn btn-block'>Salvar</button>
        <p className='message'>Está registrado?</p><Link to="/register">Login</Link>
       </form>
  </div>
  </div>
  )
}