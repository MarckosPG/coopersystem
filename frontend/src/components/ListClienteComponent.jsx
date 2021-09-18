import React, { Component } from 'react';
import ClienteService from '../services/ClienteService';

class ListClienteComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            clientes: []
        }
        this.addCliente = this.addCliente.bind(this);
        this.editCliente = this.editCliente.bind(this);
        this.deleteCliente = this.deleteCliente.bind(this);
    }


    deleteCliente(id){
        EmployeeService.deleteEmployee(id).then( res => {
            this.setState({clientes: this.state.clientes.filter(cliente => cliente.id !== id)});
        });
    }

    viewCliente(id){
        this.props.history.push(`/cliente/${id}`);
    }

    editCliente(id){
        this.props.history.push(`/addcliente/${id}`);
    }

    componentWillMount() {
        ClienteService.getClientes().then((res) => {
            this.setState({
                clientes: res.data
            })
        })
    }

    addCliente(){
        this.props.history.push("addcliente/_add");
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Lista de Clientes</h2>
                <div className="row" style={{width: '200px', paddingBottom: '20px'}}>
                    <button className="btn btn-primary" onClick={this.addCliente}>
                        Adicionar Cliente
                    </button>
                </div>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>CPF</th>
                                <th>Email</th>
                                <th>Telefone</th>
                                <th>Endereço</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.clientes.map(cliente => 
                                    <tr key={cliente.id}>
                                        <td>{cliente.nome}</td>
                                        <td>{cliente.cpf}</td>
                                        <td>{cliente.email}</td>
                                        <td>{cliente.telefones}</td>
                                        <td>{cliente.endereco}</td>
                                        <td>
                                            <button onclick={()=> this.editCliente(cliente.id)} className="btn btn-info">Editar</button>
                                            <button style={{marginLeft: "10px"}} onClick={ () => this.deleteCliente(cliente.id)} className="btn btn-danger">Deletar</button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ListClienteComponent;