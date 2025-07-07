import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useLogin } from '../context/ContextProvider';
import axiosClient from '../axiosClient';

export default function DefaultLayout({children})
{
    // Verificar se o Usuário está logado
    const {token, _setUser, _setToken, user} = useLogin();
    const navigate = useNavigate();
    
    if (!token){
        //return <Navigate to="/login"/>
    }

    const onLogout = (e) => {
        e.preventDefault();
        axiosClient.post('/login', user.email)
            .then(()=>{
                _setUser({});
                _setToken(null);
                navigate('/login');
            })
            .catch((error)=>{
                console.log(error);
        })
        _setUser({});
        _setToken(null);
        navigate('/login');
    }

    return (
    <div id="defaultLayout">
        <aside>
            <Link to="/dashboard"> Dashboard </Link>
            <Link to="/user/index"> Usuários </Link>
            <Link to="/paciente/index"> Pacientes </Link>
            <Link to="/medico/index"> Médicos </Link>
            <Link to="/consulta/index"> Consultas </Link>
            <Link to="/pagamento/index"> Pagamentos </Link>
            <Link to="/prontuarioMedico/index"> Prontuários </Link>
        </aside>
         <div className='content'>
          <header>
            <div className='header'>
              Sistema de gestão de Consultas
            </div>
            <div>
              {user.name} &nbsp; |  &nbsp;
              <Link to="/changePassword" className="btn-link" href='#'>Alterar Senha</Link>
              &nbsp;  |&nbsp;
              <a onClick={onLogout} className='btn-logout' href='#'>Logout</a>
            </div>
          </header>
            <main className='main-content'>
                { children }
            </main>
        </div>
    </div>
    )
}