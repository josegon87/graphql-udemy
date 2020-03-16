import React, { Component } from 'react'

import { NUEVO_CLIENTE } from "../mutations";
import { Mutation } from "react-apollo";

class NuevoCliente extends Component {

    state = {
        cliente: {
            nombre: '',
            apellido: '',
            empresa: '',
            edad: '',
            email: '',
            tipo: ''
        },
        error : false
    }

    updateField = e => {
        this.setState({
            cliente:{
                ...this.state.cliente,
                [e.target.name] : e.target.value
            }
        })
    };

    render(){
        const { error } = this.state;
        let respuesta = (error) ? <p className="alert alert-danger p-3 text-center">Todos los campos son obligatorios</p>
        : '';
        return (
            <React.Fragment>
                <h2 className="text-center">Nuevo Cliente</h2>
                {respuesta}
                <div className="row justify-content-center">
                <Mutation mutation={NUEVO_CLIENTE}
                    onCompleted={() => this.props.history.push('/')}
                >
                    {crearCliente => (
                        <form className="col-md-8 m-3" 
                            onSubmit={e => {
                                e.preventDefault();

                                const {nombre, apellido, empresa, edad, tipo, email} = this.state.cliente;

                                if(nombre === '' || apellido === '' || empresa === '' || tipo === '' || edad === ''){
                                    this.setState({
                                        error: true
                                    });
                                    return;
                                }

                                this.setState({
                                    error: false
                                })

                                const input = {
                                    nombre,
                                    apellido,
                                    empresa,
                                    edad: Number(edad),
                                    tipo,
                                    email
                                };

                                crearCliente({
                                    variables: {input}
                                })
                            }}
                        >
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Nombre</label>
                                    <input type="text" className="form-control" onChange={(e) => this.updateField(e)} name="nombre" placeholder="nombre"/>
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Apellido</label>
                                    <input type="text" className="form-control" onChange={(e) => this.updateField(e)} name="apellido" placeholder="apellido"/>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Empresa</label>
                                    <input type="text" className="form-control" onChange={(e) => this.updateField(e)} name="empresa" placeholder="empresa"/>
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Email</label>
                                    <input type="email" className="form-control" onChange={(e) => this.updateField(e)} name="email" placeholder="email" />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Edad</label>
                                    <input type="text" className="form-control" onChange={(e) => this.updateField(e)} name="edad" placeholder="edad"/>
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Tipo Cliente</label>  
                                    <select className="form-control" name="tipo" onChange={(e) => this.updateField(e)}>
                                        <option value="">Elegir...</option>
                                        <option value="PREMIUM">PREMIUM</option>
                                        <option value="BASICO">BÁSICO</option>
                                    </select>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-success float-right">Guardar Cambios</button>
                        </form>
                    )}
                </Mutation>
                </div>
            </React.Fragment>
        );
    }
}

export default NuevoCliente;