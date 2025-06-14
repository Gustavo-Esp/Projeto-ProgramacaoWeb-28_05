import React, { Fragment, useEffect, useState } from 'react'
import axiosClient from '../../axiosClient';
import { useNavigate, useParams } from 'react-router-dom';

function PagamentoFormShow()
{
    const navigate = useNavigate();

    const [pagamento, setPagamento] = useState({
        id:null,
        dataHora:'',
        valor:'',
        metodoPagamento:'',
        consultaId:'',
        pacienteId:'',
        consulta: {
          dataHora:'',
        },
        paciente: {
          nome:'',
        }
    });

    const {id} = useParams();
    console.log(id);

    if (id)
    {
        useEffect(() => {
            axiosClient.get(`/pagamento/show/${id}`)
            .then(({data}) =>{
                setPagamento(data.data);
                console.log(data.data);
            }).catch((error)=>{
                console.log(error);
            })
        },[id]);
    }

    // Função do tipo Anônima
    const onSubmit = (e) => {
        e.preventDefault();
        navigate('/pagamento/index');
    }
    
    return(
        <Fragment>
            <div className="display">
                <div className="card animated fadeInDown">
                    {pagamento.id && (
                        <div>
                            <h1>Data do pagamento: {pagamento.dataHora}</h1>
                            <h1>Nome do Paciente: {pagamento.paciente?.nome}</h1>
                     </div>
                    )}
                </div>
                <form>
                    <input defaultValue={pagamento.dataHora} placeholder="Data e hora do pagamento" readOnly={true}/>
                    <input defaultValue={pagamento.valor} placeholder="Valor do pagamento" readOnly={true}/>
                    <input defaultValue={pagamento.metodoPagamento} placeholder="Método de pagamento" readOnly={true}/>
                    <input defaultValue={pagamento.consulta?.dataHora} placeholder="Data da Consulta referente ao pagamento" readOnly={true}/>
                    <input defaultValue={pagamento.paciente?.nome} placeholder="Nome do Paciente" readOnly={true}/>
                    <button
                        className="btn"
                        onClick={(e)=>onSubmit(e)}>
                        Cancelar
                    </button>
                </form>
            </div>
        </Fragment>
    )
}

export default PagamentoFormShow