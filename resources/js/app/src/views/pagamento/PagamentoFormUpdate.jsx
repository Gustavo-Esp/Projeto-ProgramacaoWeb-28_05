import React, { Fragment, useEffect, useState } from 'react'
import axiosClient from '../../axiosClient';
import { Link, useNavigate, useParams } from 'react-router-dom';

function PagamentoFormUpdate()
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
                //console.log(data.data);
            }).catch((error)=>{
                console.log(error);
            })
        },[id]);
    }

    // Pega informações do Servidor
    axiosClient.get(`/pagamento/show/${id}`)
                .then(({data})=>{
                   //console.log(data.data); 
                })
                .catch();

    // Função do tipo Anônima
    const onSubmit = (e) => {
        e.preventDefault();
        axiosClient.put(`/pagamento/update/${id}`, pagamento)
            .then(() =>{
                setPagamento({});
                console.log('Pagamento alterada com sucesso');
                navigate('/pagamento/index')
            }).catch((error)=>{
                console.log(error);
            })
    }
    
    return(
        <Fragment>
            <div className="display">
                <div className="card animated fadeinDown">
                    {pagamento.id && <h1>Alteração da data: { pagamento.dataHora}</h1> && <h1>Nome do paciente: { pagamento.paciente?.nome}</h1>}

                    <form onSubmit={(e)=>onSubmit(e)}>
                        <input
                            type="text"
                            value={pagamento.dataHora}
                            placeholder="Data e hora do Pagamento"
                            onChange={
                                e => setPagamento({
                                    ...pagamento, dataHora:e.target.value
                                })
                            } />
                        <input
                            type="text"
                            value={pagamento.valor}
                            placeholder="Valor do Pagamento"
                            onChange={
                                e => setPagamento({
                                    ...pagamento, valor:e.target.value
                              })
                            } />
                        <input
                            type="text"
                            value={pagamento.metodoPagamento}
                            placeholder="Método de Pagamento"
                            onChange={
                                e => setPagamento({
                                    ...pagamento, metodoPagamento:e.target.value
                                })
                            } />
                        <button className="btn btn-edit">Salvar</button>
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

export default PagamentoFormUpdate