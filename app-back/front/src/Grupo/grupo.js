import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Form, Modal, Button } from 'react-bootstrap';

class Grupo extends Component {
    constructor() {
        super();
        this.state = {
            show: false,
            grupos: [],
            nombre: '',
            descripcion: '',
            redirect:false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    UNSAFE_componentWillMount() {
        if (!navigator.onLine) {
            if (localStorage.getItem('grupos') === null)
                this.setState({
                    talleres: []
                })
            else{
              var u=JSON.parse(localStorage.getItem('grupos'));
                this.setState(u);
            }
        }else{
        fetch("http://localhost:3001/back/grupos/", {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'authorization': 'Bearer '+localStorage.getItem('accessToken')
            }

        }).then(res => res.json()).then(lista => {
            this.setState({
                grupos: lista
            });
            var gruo={
                grupos: lista
            };
            localStorage.setItem('grupos', JSON.stringify(gruo));
        });
    }
    }
    componentDidMount() {
        if (!navigator.onLine) {
            if (localStorage.getItem('grupos') === null)
                this.setState({
                    grupos: []
                })
            else{
              var u=JSON.parse(localStorage.getItem('grupos'));
                this.setState(u);
            }
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
        });
    }


    handleSubmit(e) {
        var data = { nombre: document.getElementById("nombre").value, direccion: document.getElementById("desc").value }
        console.log(data);
        this.setState({
            show:false
        });
        fetch('http://localhost:3001/back/grupos/', {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                console.log('Success:', response);
                this.setState({
                    redirect: true
                })
                window.location.reload();
            });
    }
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/grupos' />
        }
    }
    DeployForm() {

        return <> <Button variant="danger" onClick={() => this.handleShow()}>+</Button>
            <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Crea un Grupo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="nombre">
                            <Form.Label>Nombre:</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>
                        <Form.Group controlId="desc">
                            <Form.Label>Descripción:</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>Cancelar</Button>
                    <Button variant="success" onClick={this.handleSubmit}>Crear Grupo</Button>
                </Modal.Footer>
            </Modal>
        </>;
    }
    deployList() {
        let final = [];
        for (let i = 0; i <= this.state.grupos.length; i += 3) {
            let retorno = [];
            let e1 = i === this.state.grupos.length ? -1 : this.state.grupos[i];
            let e2 = i + 1 < this.state.grupos.length ? this.state.grupos[i + 1] : i + 1 === this.state.grupos.length ? -1 : null;
            let e3 = i + 2 < this.state.grupos.length ? this.state.grupos[i + 2] : i + 2 === this.state.grupos.length ? -1 : null;
            if (e1 === -1) {
                retorno.push(
                    <div className="col-12 col-md-4" key={i}>
                        <div className="card border-danger text-center my-2">
                            <h2>Crea un grupo</h2>
                            {this.DeployForm()}
                        </div>
                    </div>);
            }
            else {
                retorno.push(
                    <div className="col-12 col-md-4" key={i}>
                        <Link to={"/grupos/" + e1._id}>
                            <div className="card text-center py-3">
                                <h2>{e1.nombre}</h2>
                            </div>
                        </Link>
                    </div>);
            }

            if (e2 !== null) {
                if (e2 === -1) {
                    retorno.push(
                        <div className="col-12 col-md-4" key={i+1}>
                            <div className="card border-danger text-center my-2">
                                <h2>Crea un grupo</h2>
                                {this.DeployForm()}
                            </div>
                        </div>);
                }
                else {
                    retorno.push(
                        <div className="col-12 col-md-4" key={i+1}>
                            <Link to={"/grupos/" + e2._id}>
                                <div className="card text-center py-3">
                                    <h2>{e2.nombre}</h2>
                                </div>
                            </Link>
                        </div>);
                }
            }
            if (e3 !== null) {
                if (e3 === -1) {
                    retorno.push(
                        <div className="col-12 col-md-4" key={i+2}>
                            <div className="card border-danger text-center my-2">
                                <h2>Crea un grupo</h2>
                                {this.DeployForm()}
                            </div>
                        </div>);
                }
                else {
                    retorno.push(
                        <div className="col-12 col-md-4" key={i+2}>
                            <Link to={"/grupos/" + e3._id}>
                                <div className="card text-center py-3">
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
            <div className="container-fluid text-center">
                <br>
                </br>
                <h1 className="display-4">Grupos disponibles</h1>
                <br>
                </br>
                <br>
                </br>

                {this.deployList().map((e) => {
                    return e;
                })}
                {this.renderRedirect()}
            </div>
        );
    }
}

export default Grupo;