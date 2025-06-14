import React, { useEffect, useState } from 'react'
import axiosClient from '../../axiosClient';
import { Link } from 'react-router-dom';

export default function PagamentoFormList()
{
    const [pagamentos, setPagamentos] = useState([]);

    const getPagamentos = () => {
        axiosClient
            .get('/pagamento/index')
            .then(({data}) => {
                setPagamentos(data.data);
            })
            .catch((error)=>{
                console.log(error);
            });
    }

    useEffect(() => {
        getPagamentos();
    }, []);

    return(
        <div className="display">
            <div className="card animated fadeInDown">
                <div style={{
                    display:'flex',
                    justifyContent:'space-between',
                    alignItems:'center'
                }}>
                    <h1>Pagamentos</h1> 
                    <Link to="/pagamento/store" className="btn-add">Store</Link>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th className="col-id">Id</th>
                            <th className="col-dataHora">Data do Pagamento</th>
                            <th className="col-valor">Valor</th>
                            <th className="col-metodoPagamento">Forma de Pagamento</th>
                            <th className="col-paciente-nome">Paciente</th>
                            <th className="col-id">Consulta</th>
                            <th className='center actions' colSpan={3}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            pagamentos.length > 0 ? (
                                pagamentos && pagamentos.map((pagamento) => (
                                    <tr key={pagamento.id}>
                                        <td>{pagamento.id}</td>
                                        <td>{pagamento.dataHora}</td>
                                        <td>{pagamento.valor}</td>
                                        <td>{pagamento.metodoPagamento}</td>
                                        <td>{pagamento.paciente?.nome}</td>
                                        <td>{pagamento.consulta?.id}</td>
                                        <td className="center actions">
                                            <Link className="btn-show" to={`/pagamento/show/${pagamento.id}`}>Show</Link>
                                        </td>
                                        <td className="center actions">
                                            <Link className="btn-edit" to={`/pagamento/update/${pagamento.id}`}>Update</Link>
                                        </td>  
                                        <td className="center actions">
                                            <Link className="btn-delete" to={`/pagamento/destroy/${pagamento.id}`}>Destroy</Link>
                                        </td> 
                                    </tr>
                                ))
                            ):(
                                <tr>
                                    <td>
                                        Nenhum registro localizado
                                    </td>
                                </tr>
                            )
                            
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

