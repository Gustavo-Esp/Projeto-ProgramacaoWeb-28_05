import {useState} from 'react';
import {Link} from 'react-router-dom'
export default function Signup(){  

    return(
        <div className="login-signup-form animated fadeInDown">
        <div className="form">
          <form>
            <h1 className="title">Registre sua conta</h1>
            {
              message &&
              <div className="alert">
                <p>{message}</p>
              </div>
            }
    
            <input type="text" placeholder='Nome'/>
            <input type="text" placeholder='E-mail'/>
            <input type="password" placeholder='Senha'/>
            <input type="password" placeholder='Confirme Senha'/>
            <button className='btn btn-block'>Salvar</button>
            <p className='message'>Está registrado?</p><Link to="/register">Login</Link>
           </form>
      </div>
      </div>

  )
}