import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button, Modal, Form } from 'react-bootstrap';
import {FormattedMessage} from 'react-intl';

class Taller extends Component {
    constructor() {
        super();
        this.state = {
            show: false,
            talleres: [],
            nombre: '',
            direccion: '',
            redirect: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    UNSAFE_componentWillMount() {
        if (!navigator.onLine) {
            if (localStorage.getItem('talleres') === null)
                this.setState({
                    talleres: []
                })
            else{
              var u=JSON.parse(localStorage.getItem('talleres'));
                this.setState(u);
            }
        }else{
        fetch("http://localhost:3001/back/talleres/").then(res => res.json()).then(lista => {
            this.setState({
                talleres: lista
            });
            localStorage.setItem('talleres', JSON.stringify({
                talleres: lista
            }));
        });
    }
    }
    componentDidMount() {
        if (!navigator.onLine) {
            if (localStorage.getItem('talleres') === null)
                this.setState({
                    talleres: []
                })
            else{
              var u=JSON.parse(localStorage.getItem('talleres'));
                this.setState(u);
            }
        }
        if (document.getElementById("navPage") === null) {
            document.getElementById("pagTaller").setAttribute("role", "main");
        }
    }

    handleShow = () => {
        console.log(this.state.show)
        this.setState({
            show: true
        })
    }

    handleClose = () => {
        this.setState({
            show: false
        })
    }


    handleSubmit(e) {
        var data = { nombre: document.getElementById("nombre").value, direccion: document.getElementById("direc").value }
        this.setState({
            show:false
        });
        fetch('http://localhost:3001/back/talleres/', {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                console.log('Success:', response);
                this.setState({
                    redirect: true
                });
                window.location.reload();
            });
    }
    renderRedirect = () => { 
        if (this.state.redirect) { 
          return <Redirect to = '/talleres/' /> 
        } 
      }
    DeployForm() {

        return <> <Button variant="danger" onClick={() => this.handleShow()}>+</Button>
            <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title><FormattedMessage id="CrearTaller"/></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="nombre">
                            <Form.Label><FormattedMessage id="Nombre"/>:</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>
                        <Form.Group controlId="direc">
                            <Form.Label><FormattedMessage id="Direccion"/>:</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}><FormattedMessage id="Cancelar"/></Button>
                    <Button variant="success" onClick={this.handleSubmit}><FormattedMessage id="CrearTB"/></Button>
                </Modal.Footer>
            </Modal>
        </>;
    }
    deployList() {
        let final = [];
        for (let i = 0; i <= this.state.talleres.length; i += 3) {
            let retorno = [];
            let e1 = i === this.state.talleres.length ? -1 : this.state.talleres[i];
            let e2 = i + 1 < this.state.talleres.length ? this.state.talleres[i + 1] : i + 1 === this.state.talleres.length ? -1 : null;
            let e3 = i + 2 < this.state.talleres.length ? this.state.talleres[i + 2] : i + 2 === this.state.talleres.length ? -1 : null;
            if (e1 === -1) {
                if (localStorage.getItem('accessToken') !== null) {
                    retorno.push(
                        <div className="col-12 col-md-4" key={i}>
                            <div className="card border-danger text-center my-2">
                                <h2><FormattedMessage id="CrearTaller"/></h2>
                                {this.DeployForm()}
                            </div>
                        </div>);
                }
            }
            else {
                retorno.push(
                    <div className="col-12 col-md-4" key ={i}>
                        <Link style={{ textDecoration: 'none' }} to={"/talleres/" + e1._id}>
                            <div className="card text-center py-3 my-2">
                                <h2>{e1.nombre}</h2>
                            </div>
                        </Link>
                    </div>);
            }

            if (e2 !== null) {
                if (e2 === -1) {
                    if (localStorage.getItem('accessToken') !== null) {
                        retorno.push(
                            <div className="col-12 col-md-4" key ={i+1}>
                                <div className="card border-danger text-center my-2">
                                    <h2><FormattedMessage id="CrearTaller"/></h2>
                                    {this.DeployForm()}
                                </div>
                            </div>);
                    }
                }
                else {
                    retorno.push(
                        <div className="col-12 col-md-4" key ={i+1}>
                            <Link style={{ textDecoration: 'none' }} to={"/talleres/" + e2._id}>
                                <div className="card text-center py-3 my-2">
                                    <h2>{e2.nombre}</h2>
                                </div>
                            </Link>
                        </div>);
                }
            }
            if (e3 !== null) {
                if (e3 === -1) {
                    if (localStorage.getItem('accessToken') !== null) {
                        retorno.push(
                            <div className="col-12 col-md-4" key ={i+2}>
                                <div className="card border-danger text-center my-2">
                                    <h2><FormattedMessage id="CrearTaller"/></h2>
                                    {this.DeployForm()}
                                </div>
                            </div>);
                    }
                }
                else {
                    retorno.push(
                        <div className="col-12 col-md-4" key ={i+2}>
                            <Link style={{ textDecoration: 'none' }} to={"/talleres/" + e3._id}>
                                <div className="card text-center py-3 my-2">
                                    <h2>{e3.nombre}</h2>
                                </div>
                            </Link>
                        </div>);
                }
            }
            final.push(<div className="row" key={"row"+i}>{retorno}</div>);
        }
        return final;
    }
    render() {
        return (
            <div className="container-fluid text-center" id="pagTaller">
                <h1 className="display-4"><FormattedMessage id="Talleres"/></h1>
                {this.deployList().map((e) => {
                    return e;
                })}
                {this.renderRedirect()}
            </div>
        );
    }
}

export default Taller;