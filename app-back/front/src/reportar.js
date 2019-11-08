import React, { Component } from 'react';
import {Button, Modal, Form} from 'react-bootstrap';
import { Card, Row } from 'react-bootstrap';
import {Redirect} from 'react-router-dom';

class Reportar extends Component {

    constructor(){
        super();
         this.state ={
            show : false, 
            marca : '',
            tipo : '',
            color : '',
            tamano : '',
            direccion : '',
            redirect : false
        }
        this.textInput = React.createRef();
    }
    

    handleShow=()=>{
        console.log(this.state.show)
        this.setState({
            show : true
        })
    }

    handleClose =() =>{
        this.setState({
            show: false
        })
    }

    handleSubmit = e =>{
        e.preventDefault();
        var m=JSON.parse(localStorage.getItem('user'));

        var data = { user: m.nickname,
            marca:document.getElementById("formGroupMarca").value,
                    tipo:document.getElementById("formGroupTipo").value,
                    color:document.getElementById("formGroupColor").value,
                    tamano: document.getElementById("formGroupTamanho").value,
                    direccion: document.getElementById("formGroupDireccion").value
    }
        console.log(data);
        this.setState({
            show:false
        })

        fetch('/robos/', {
            method: 'POST', 
            body: JSON.stringify(data), 
            headers:{
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          }).then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then(response => {console.log('Success:', response);
          this.setState ({ 
            redirect: true 
          }) });
        
    }

    renderRedirect = () => { 
        if (this.state.redirect) { 
          return <Redirect to = '/robos' /> 
        } 
      }

    render() {
        return (
            <Row className="justify-content-md-center">
               <Card className="text-center" >
                   <Card.Body style={{backgroundColor: '#EDF2F4'}}>
                      <Card.Title>
                           <h1>Reportar un Robo</h1>
                    </Card.Title>
                    <Button className="btn btn-danger btn-lg" onClick={() => this.handleShow()} size="lg" block>Reportar</Button>
                    </Card.Body>
                </Card>
                    
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Reporte de Robo </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Por favor, ingresa la información de tu bicicleta</Modal.Body>

                    <Form>
                        <Form.Group controlId="formGroupMarca">
                            <Form.Label>Marca de la bicicleta</Form.Label>
                            <Form.Control type="text" placeholder="Ej: Trek" />
                        </Form.Group>
                        <Form.Group controlId="formGroupTipo">
                            <Form.Label>Tipo</Form.Label>
                            <Form.Control type="text" placeholder="Ej: BMX" />
                        </Form.Group>
                        <Form.Group controlId="formGroupColor">
                            <Form.Label>Color</Form.Label>
                            <Form.Control type="text" placeholder="Ej: Rojo" />
                        </Form.Group>
                        <Form.Group controlId="formGroupTamanho">
                            <Form.Label>Tamaño de la bicicleta</Form.Label>
                            <Form.Control as="select" >
                                <option>Alta</option>
                                <option>Mediana</option>
                                <option>Baja</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formGroupDireccion">
                            <Form.Label>Por favor, ingresa la direccion en la que te robaron la bicicleta</Form.Label>
                            <Form.Control type="text" placeholder="Ej: Carrera 63 # 1" />
                        </Form.Group>
                    </Form>

                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.statehandleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={(e) => this.handleSubmit(e)}>
                        Reportar
                    </Button>
                    </Modal.Footer>
                </Modal>
                {this.renderRedirect()}
            </Row>
        );
    }
}

export default Reportar;