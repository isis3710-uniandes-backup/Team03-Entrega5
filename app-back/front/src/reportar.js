import React, { Component } from 'react';
import {Button, Modal, Form} from 'react-bootstrap';
import { Card, Row } from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';

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

        fetch('http://localhost:3001/robos/', {
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
                           <h1><FormattedMessage id="Reportar"/></h1>
                    </Card.Title>
                    <Button className="btn btn-danger btn-lg" onClick={() => this.handleShow()} size="lg" block><FormattedMessage id="ReportarB"/></Button>
                    </Card.Body>
                </Card>
                    
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title><FormattedMessage id="Reportar"/> </Modal.Title>
                    </Modal.Header>
                    <Modal.Body><FormattedMessage id="Info"/></Modal.Body>

                    <Form>
                        <Form.Group controlId="formGroupMarca">
                            <Form.Label><FormattedMessage id="MarcaForm"/></Form.Label>
                            <Form.Control type="text" placeholder="Ej: Trek" />
                        </Form.Group>
                        <Form.Group controlId="formGroupTipo">
                            <Form.Label><FormattedMessage id="Tipo"/></Form.Label>
                            <Form.Control type="text" placeholder="Ej: BMX" />
                        </Form.Group>
                        <Form.Group controlId="formGroupColor">
                            <Form.Label><FormattedMessage id="Color"/></Form.Label>
                            <Form.Control type="text" placeholder="Ej: Rojo" />
                        </Form.Group>
                        <Form.Group controlId="formGroupTamanho">
                            <Form.Label><FormattedMessage id="TamanoForm"/></Form.Label>
                            <Form.Control as="select" >
                                <option><FormattedMessage id="Alta"/></option>
                                <option><FormattedMessage id="Mediana"/></option>
                                <option><FormattedMessage id="Pequena"/></option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formGroupDireccion">
                            <Form.Label><FormattedMessage id="LocalidadForm"/></Form.Label>
                            <Form.Control type="text" placeholder="Ej: Carrera 63 # 1" />
                        </Form.Group>
                    </Form>

                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.statehandleClose}>
                        <FormattedMessage id="CerrarB"/>
                    </Button>
                    <Button variant="primary" onClick={(e) => this.handleSubmit(e)}>
                        <FormattedMessage id="ReportarB"/>
                    </Button>
                    </Modal.Footer>
                </Modal>
                {this.renderRedirect()}
            </Row>
        );
    }
}

export default Reportar;