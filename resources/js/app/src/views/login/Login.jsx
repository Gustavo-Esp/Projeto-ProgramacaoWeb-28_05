import { createRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../../axiosClient";
import { useLogin } from "../../context/ContextProvider";
import { useValidarDadosLogin } from "../../rules/LoginValidationRules";


export default function Login(){

    const {model, error, setError, handleChangeField, validateAll} = useValidarDadosLogin();
    const navigate = useNavigate();

    const { _setToken, _setUser } = useLogin();

    const [message, setMessage] = useState(null);

    const getInputClass = (error) =>{
        if (error){
            return "form-control is-invalid";
        }
        else if (error === false)
        {
            return "form-control is-valid";
        }
        else
        {
            return "form-control";
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        let erros = validateAll();
        console.log(erros);
        console.log(error);
        setError(erros);
        
        console.log("Passando pelo OnSubmit");
        
        
        const login = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }

        axiosClient.post('/login', login)
                   .then(({data})=>{
                        console.log(data);
                        _setToken(data.token);
                        _setUser(data.user);
                        setMessage("Login realizado com Sucesso" + login);
                        navigate('/dashboard');
                   })
                   .catch((erro)=>{
                        console.log(erro);
                   })
    }

    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title p-20">Acesso ao Sistema com sua conta</h1>
                    {
                        message &&
                        <div className='alert'>
                            <p>{message}</p>
                        </div>
                    }
                    <div className ="p-20">
                    <input
                        type="text"
                        placeholder="E-mail"
                        name="email"
                        value={model.email}
                        className={getInputClass(error.email)}
                        onChange={handleChangeField}
                    />
                    {
                        error.email ?(
                                <div className="invalid-feedback">{
                                    error.emailMensagem.map((mens, index) => {
                                        return (
                                            <p key={index}>
                                                <span style={{margin:"0", color:"red"}}>{mens}</span>
                                            </p>
                                        )
                                    })
                                }
                                </div>
                        ) : null
                    }
                    </div>
                    <div className="p-20">
                        <input
                            type="password"
                            placeholder="Senha"
                            name="password" 
                            value={model.password} 
                            className={getInputClass(error.password)}
                            onChange={handleChangeField}
                        />
                        {
                            error.password ?(
                                <div className="invalid-feedback">{
                                    error.passwordMensagem.map((mens, index) => {
                                        return (
                                            <p key={index}>
                                                <span style={{margin:"0", color:"red"}}>{mens}</span>
                                            </p>
                                        )
                                    })
                                }
                                </div>
                            ) : null
                        }
                    </div>
                    <button type="submit" className='btn btn-block p-20'>Login</button>
                    <p className='message'>Não está registrado? <Link to="/register">Criar nova conta</Link></p>
                </form>
            </div>
        </div>
    );
}