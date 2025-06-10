import React, { Fragment} from 'react'
import axiosClient from '../../axiosClient';
import { Link, useNavigate} from 'react-router-dom';
import { useValidarDadosUsuario } from '../../rules/UserValidationRules';
import Input from '../../components/input/Input';

function UserFormStore()
{
    const navigate = useNavigate();

    const {
        model,
        error,
        setModel,
        formValid,
        handleChangeField,
        handleBlurField
    } = useValidarDadosUsuario();

    // Função do tipo Anônima
    const onSubmit = (e) => {
        e.preventDefault();
        if (formValid()) {
            console.log("Formulário inválido");
            axiosClient.post(`/user/store`, user)
            .then(() =>{
                setModel({});
                console.log('Usuário incluído com sucesso');
                navigate('/user/index')
            }).catch((error)=>{
                console.log(error);
            })
        }
    }

    const onCancel = (e) => {
        //e.preventDefault();
        navigate('/user/index');
    }

    return(
        <Fragment>
            <div className="display">
                <div className="card animated fadeinDown">
                    <h1>Inclusão de Usuário</h1>

                    <form onSubmit={(e)=>onSubmit(e)}>
                        <div className ="p-20"> 
                            <Input 
                                id="name"
                                type="text"
                                value={model.name}
                                placeholder="Nome"
                                handleChangeField={handleChangeField}
                                handleBlurField={handleBlurField}
                                error={error.name}
                                mensagem={error.nameMensagem}
                            />
                        </div>
                        <div className ="p-20">
                            <Input 
                                id="email"
                                type="text"
                                value={model.email}
                                placeholder="Email"
                                handleChangeField={handleChangeField}
                                handleBlurField={handleBlurField}
                                error={error.email}
                                mensagem={error.emailMensagem}
                            />
                        </div>
                        <div className ="p-20">
                            <Input 
                                id="password"
                                type="password"
                                value={model.password}
                                placeholder="Senha"
                                handleChangeField={handleChangeField}
                                handleBlurField={handleBlurField}
                                error={error.password}
                                mensagem={error.passwordMensagem}
                            />
                        </div>
                        <button className="btn btn-edit">Salvar</button>
                        <Link
                            type='button' 
                            className='btn btn-cancel'
                            to='/user/index'>
                                Cancelar
                        </Link>
                    </form>
                </div> 
            </div>
        </Fragment>
    )
}

export default UserFormStore
