import React from 'react'
import { Routes, Route } from 'react-router-dom'
import UserFormList from '../views/user/UserFormList'
import UserFormStore from '../views/user/UserFormStore'
import UserFormUpdate from '../views/user/UserFormUpdate'
import UserFormShow from '../views/user/UserFormShow'
import UserFormDestroy from '../views/user/UserFormDestroy'

import PacienteFormList from '../views/paciente/PacienteFormList'
import PacienteFormStore from '../views/paciente/PacienteFormStore'
import PacienteFormUpdate from '../views/paciente/PacienteFormUpdate'
import PacienteFormShow from '../views/paciente/PacienteFormShow'
import PacienteFormDestroy from '../views/paciente/PacienteFormDestroy'

import MedicoFormList from '../views/medico/MedicoFormList'
import MedicoFormStore from '../views/medico/MedicoFormStore'
import MedicoFormUpdate from '../views/medico/MedicoFormUpdate'
import MedicoFormShow from '../views/medico/MedicoFormShow'
import MedicoFormDestroy from '../views/medico/MedicoFormDestroy'

import ConsultaFormList from '../views/consulta/ConsultaFormList'
import ConsultaFormStore from '../views/consulta/ConsultaFormStore'
import ConsultaFormUpdate from '../views/consulta/ConsultaFormUpdate'
import ConsultaFormShow from '../views/consulta/ConsultaFormShow'
import ConsultaFormDestroy from '../views/consulta/ConsultaFormDestroy'

import ProntuarioMedicoFormList from '../views/prontuarioMedico/ProntuarioMedicoFormList'
import ProntuarioMedicoFormStore from '../views/prontuarioMedico/ProntuarioMedicoFormStore'
import ProntuarioMedicoFormUpdate from '../views/prontuarioMedico/ProntuarioMedicoFormUpdate'
import ProntuarioMedicoFormShow from '../views/prontuarioMedico/ProntuarioMedicoFormShow'
import ProntuarioMedicoFormDestroy from '../views/prontuarioMedico/ProntuarioMedicoFormDestroy'

import PagamentoFormList from '../views/pagamento/PagamentoFormList'
import PagamentoFormStore from '../views/pagamento/PagamentoFormStore'
import PagamentoFormUpdate from '../views/pagamento/PagamentoFormUpdate'
import PagamentoFormShow from '../views/pagamento/PagamentoFormShow'
import PagamentoFormDestroy from '../views/pagamento/PagamentoFormDestroy'

import Layout from './Layout'
import Dashboard from '../components/Dashboard'
import NotFound from '../views/user/NotFound'
import Login from '../views/login/Login'
import Signup from '../views/login/Signup'
import UpdatePassword from '../views/login/UpdatePassword'
import ForgotPassword from '../views/login/ForgotPassword'
import ChangePassword from '../views/login/ChangePassword'
 
 const Rotas = () => {
   return (
     <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<Login/>}/>
        <Route path='/register' element={<Signup/>}/>
        <Route path='/updatepassword' element={<UpdatePassword/>}/>
        <Route path='/forgotpassword' element={<ForgotPassword/>}/>
        <Route path='/changepassword' element={<ChangePassword/>}/>
        <Route element={<Layout/>}>
        <Route path='/dashboard' element={<Dashboard/>}/>

        <Route path="/user/index" element={<UserFormList />} />
        <Route path="/user/store" element={<UserFormStore />} />
        <Route path="/user/update/:id" element={<UserFormUpdate />} />
        <Route path="/user/show/:id" element={<UserFormShow />} />
        <Route path="/user/destroy/:id" element={<UserFormDestroy />} />

        <Route path="/paciente/index" element={<PacienteFormList />} />
        <Route path="/paciente/store" element={<PacienteFormStore />} />
        <Route path="/paciente/update/:id" element={<PacienteFormUpdate />} />
        <Route path="/paciente/show/:id" element={<PacienteFormShow />} />
        <Route path="/paciente/destroy/:id" element={<PacienteFormDestroy />} />

        <Route path="/medico/index" element={<MedicoFormList />} />
        <Route path="/medico/store" element={<MedicoFormStore />} />
        <Route path="/medico/update/:id" element={<MedicoFormUpdate />} />
        <Route path="/medico/show/:id" element={<MedicoFormShow />} />
        <Route path="/medico/destroy/:id" element={<MedicoFormDestroy />} />

        <Route path="/consulta/index" element={<ConsultaFormList />} />
        <Route path="/consulta/store" element={<ConsultaFormStore />} />
        <Route path="/consulta/update/:id" element={<ConsultaFormUpdate />} />
        <Route path="/consulta/show/:id" element={<ConsultaFormShow />} />
        <Route path="/consulta/destroy/:id" element={<ConsultaFormDestroy />} />

        <Route path="/prontuarioMedico/index" element={<ProntuarioMedicoFormList />} />
        <Route path="/prontuarioMedico/store" element={<ProntuarioMedicoFormStore />} />
        <Route path="/prontuarioMedico/update/:id" element={<ProntuarioMedicoFormUpdate />} />
        <Route path="/prontuarioMedico/show/:id" element={<ProntuarioMedicoFormShow />} />
        <Route path="/prontuarioMedico/destroy/:id" element={<ProntuarioMedicoFormDestroy />} />

        <Route path="/pagamento/index" element={<PagamentoFormList />} />
        <Route path="/pagamento/store" element={<PagamentoFormStore />} />
        <Route path="/pagamento/update/:id" element={<PagamentoFormUpdate />} />
        <Route path="/pagamento/show/:id" element={<PagamentoFormShow />} />
        <Route path="/pagamento/destroy/:id" element={<PagamentoFormDestroy />} />

        </Route>
        <Route path="*" element={<NotFound/>}/>
     </Routes>
   )
 }
 
 export default Rotas