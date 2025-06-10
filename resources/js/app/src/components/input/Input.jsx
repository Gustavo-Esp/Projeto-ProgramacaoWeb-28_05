import React from 'react';
import MensagemErro from '../mensagens/MensagemErro';
import { Fragment } from 'react';


const Input = ({
  id,
  type,
  value,
  placeholder,
  handleChangeField,
  handleBlurField,
  error,
  mensagem,
}) => {

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

  return (
    <Fragment>
      <input
        id = {id}
        type={type}
        value={value || ''}
        name = {id}
        placeholder={placeholder}
        onChange={handleChangeField}
        onBlur={handleBlurField} 
        className={getInputClass(error)}
        />
        <MensagemErro
            error={error}
            mensagem={mensagem}
        />
    </Fragment>
  )
}

export default Input



    