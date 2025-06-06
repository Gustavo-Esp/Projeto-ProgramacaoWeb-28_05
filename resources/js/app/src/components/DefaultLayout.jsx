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
            <Link to="/user/index"> Usuário </Link>
            <Link to="/paciente/index"> Paciente </Link>
            <Link to="/medico/index"> Medico </Link>
            <Link to="/consulta/index"> Consulta </Link>
            <Link to="/pagamento/index"> Pagamento </Link>
            <Link to="/prontuarioMedico/index"> ProntuarioMedico </Link>
        </aside>
        <div className='content'>
            <header>
                <div>
                    Sistema de Clínica Médica
                </div>
                <div>
                    {/* Espaço em Branco = &nbsp; */}
                    { user.name } &nbsp; &nbsp;
                    <a onClick={onLogout} className='btn-logout' href="#"> Logout </a>
                </div>
            </header>
            <main>
                { children }
            </main>
        </div>
    </div>
    )
}