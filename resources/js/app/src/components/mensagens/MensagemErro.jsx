import React from 'react'

const MensagemErro = ({
    error, mensagem
}) => {
    return (
        <Fragment>
            {
                error && (
                    <div className="invalid-feedback">
                        {

                            mensagem.map((mens, index)=>{
                                return(
                                    <p key={index}>
                                        <span>{console.log(mens)}</span>
                                    </p>
                            )})
                        }
                    </div>
                )
            }
        </Fragment>
    )
}

export default MensagemErro