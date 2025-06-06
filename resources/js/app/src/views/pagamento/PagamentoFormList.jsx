import React, { useEffect, useState } from 'react'
import axiosClient from '../../axiosClient';
import { Link } from 'react-router-dom';

export default function PagamentoFormList()
{
    const [pagamentos, setPagamentos] = useState([]);

    // Função anômina na linguagem JavaScript
    const getPagamentos = () => {
        axiosClient
            .get('/pagamento/index')
            .then(({data}) => {
                //console.log(data.data);
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
                            <th>ID</th>
                            <th>dataHora</th>
                            <th>valor</th>
                            <th>metodoPagamento</th>
                            <th>pacienteID</th>
                            <th>consultaID</th>
                            <th className="center actions" colSpan="3">Ações</th>
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
                                        <td>{pagamento.pacienteID}</td>
                                        <td>{pagamento.consultaID}</td>
                                        <td>{pagamento.paciente?.nome}</td>
                                        <td>{pagamento.consulta?.nome}</td>
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

