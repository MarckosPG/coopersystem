import React, { Component } from 'react';
import ClienteService from '../services/ClienteService';

class CreateClienteComponent extends Component {

    constructor(props) {
        super(props);

       this.state = {
            // step 2
            id: this.props.match.params.id,
            nome: '',
            cpf: '',
            endereco: '',
            telefones: '',
            email: ''
        }

        this.changeNomeHandler = this.changeNomeHandler.bind(this);
        this.changeCpfHandler = this.changeCpfHandler.bind(this);
        this.changeEnderecoHandler = this.changeEnderecoHandler.bind(this);
        this.changeTelefonesHandler = this.changeTelefonesHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);

    }

     componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            ClienteService.getClienteById(this.state.id).then( (res) =>{
                let cliente = res.data;
                this.setState({
                    nome: cliente.nome,
                    cpf: cliente.cpf,
                    endereco : cliente.endereco,
                    telefones : cliente.telefones,
                    email: cliente.email
                });
            });
        }        
    }
    saveOrUpdateCliente = (e) => {
        e.preventDefault();
        let cliente = {nome: this.state.nome, cpf: this.state.cpf, endereco: this.state.endereco, telefones: this.state.telefones, email: this.state.email };
        console.log('cliente => ' + JSON.stringify(cliente));

        // step 5
        if(this.state.id === '_add'){
            ClienteService.createCliente(cliente).then(res =>{
                this.props.history.push('/clientes');
            });
        }else{
            ClienteService.updateCliente(cliente, this.state.id).then( res => {
                this.props.history.push('/clientes');
            });
        }
    }
    
    changeNomeHandler= (event) => {
        this.setState({nome: event.target.value});
    }

    changeCpfHandler= (event) => {
        this.setState({cpf: event.target.value});
    }

    changeEnderecoHandler= (event) => {
        this.setState({endereco: event.target.value});
    }

    changeTelefonesHandler = (event) => {
         this.setState({telefones: event.target.value});
    }

    changeEmailHandler = (event) => {
         this.setState({email: event.target.value});
    }

    cancel(){
        this.props.history.push('/clientes');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Adicionar Cliente</h3>
        }else{
            return <h3 className="text-center">Atualizar Cliente</h3>
        }
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Nome: </label>
                                            <input placeholder="Nome" name="nome" className="form-control" 
                                                value={this.state.nome} onChange={this.changeNomeHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> CPF: </label>
                                            <input placeholder="CPF" name="cpf" className="form-control" 
                                                value={this.state.cpf} onChange={this.changeCpfHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Endereço: </label>
                                            <input placeholder="Endereço" name="endereco" className="form-control" 
                                                value={this.state.endereco} onChange={this.changeEnderecoHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Telefone: </label>
                                            <input placeholder="Telefone" name="telefones" className="form-control" 
                                                value={this.state.telefones} onChange={this.changeTelefonesHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Email: </label>
                                            <input placeholder="Email" name="email" className="form-control" 
                                                value={this.state.email} onChange={this.changeEmailHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.saveOrUpdateCliente}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        );
    }
}

export default CreateClienteComponent;