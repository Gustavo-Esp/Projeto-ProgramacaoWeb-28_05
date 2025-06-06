import { useState } from "react";

const useValidator = (initialModel, errorModel, validationRules) =>{
  const [model, setModel] = useState(initialModel);
  const [error, setError] = useState(errorModel);

  const handleChangeField = (e) =>{
    const {name, value} = e.target;
    setModel((prev) => ({
      ...prev,[name] : value
    }));

    console.log(model);
  }

  const hasErros = (erros) => {
    return Object.values(erros).some(value=> value === true);
  }

  const validateAll = () => {
    let erros = {};
    Object.keys(validationRules).forEach((field) => {
      const validationFunction = validationRules[field];
      const value = model[field];

      erros[`${field}Mensagem`] = validationFunction(value, model);
      erros[field]=!!(erros[`${field}Mensagem`] && erros[`${field}Mensagem`].length > 0);

      return erros;
    })
  }

  const formValid = () => {
    const erros = validateAll();
    setError(erros);
    return !hasErrors(erros);
  }

  return {
    model,
    setModel,
    error,
    setError,
    handleChangeField,
    validateAll,
    formValid,

  }
}

export default useValidator;

