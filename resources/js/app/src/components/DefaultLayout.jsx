import React from 'react'
import {Link} from 'react-router-dom'

export default function DefaultLayout({children}){


  return (

    <div id ="defaultlayout">
      <aside>
        <Link to = "/dashboard" >Dashboard</Link>
        <Link to = "/user/index" >Usuário</Link> 
        <Link to = "/paciente/index" >Paciente</Link>
        <Link to = "/editora/index" >Editora</Link>
      </aside>
      <div className='content'>
        <header>{/* semânticas */}
          <div className='header'>
            Header
          </div>
            Sistema de Controle 
          <div>
            Gustavo &nbsp; &nbsp;
            <a className='btn-logout'>Logout</a>
          </div>

        </header>
        <main>
          {children}
        </main>
      </div> 
    </div> 
  )
}