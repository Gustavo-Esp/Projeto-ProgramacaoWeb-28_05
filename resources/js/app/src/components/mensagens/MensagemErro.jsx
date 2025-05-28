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
                                <p key={index} style={{margin:"0", color:"red"}}>
                                    <span>{mens}</span>
                                </p>
                            })
                        }
                    </div>
                )
            }
        </Fragment>
    )
}

export default MensagemErro