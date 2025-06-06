import React, { Fragment, useEffect, useState } from 'react'
import axiosClient from '../../axiosClient';
import { Link, useNavigate, useParams } from 'react-router-dom';

function PagamentoFormDestroy()
{
    const navigate = useNavigate();

    const [pagamento, setPagamento] = useState({
        id:null,
        dataHora:'',
        valor:'',
        metodoPagamento:'',
        consultaID:'',
        pacienteID:'',
        consulta: {
          dataHora:'',
        },
        paciente: {
          nome:'',
        }
    });

    const {id} = useParams();

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

    // Pega informações do Servidor
    axiosClient.get(`/pagamento/show/${id}`)
                .then(({data})=>{
                   console.log(data.data); 
                })
                .catch();

    // Função do tipo Anônima
    const onSubmit = (e) => {
        e.preventDefault();
        axiosClient.delete(`/pagamento/destroy/${id}`)
            .then(() =>{
                setPagamento({});
                console.log('Pagamento excluído com sucesso');
                navigate('/pagamento/index')
            }).catch((error)=>{
                console.log(error);
            })
    }
    
    return(
        <Fragment>
            <div className="display">
                <div className="card animated fadeinDown">
                    {pagamento.id && <h1>Exclusão de Pagamento: { pagamento.dataHora}</h1> && <h1>Nome do paciente: { pagamento.paciente?.nome}</h1>}

                    <form onSubmit={(e)=>onSubmit(e)}>
                        <input defaultValue={pagamento.dataHora} placeholder="Horário do pagamento" readOnly={true}/>
                        <input defaultValue={pagamento.valor} placeholder="Valor do pagamento" readOnly={true}/>
                        <input defaultValue={pagamento.metodoPagamento} placeholder="Método de pagamento" readOnly={true}/>
                        <button className="btn btn-delete">Excluir</button>
                        <Link
                            type='button' 
                            className='btn btn-cancel'
                            to='/pagamento/index'>
                                Cancelar
                        </Link>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default PagamentoFormDestroy