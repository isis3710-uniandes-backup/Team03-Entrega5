import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Background from './images/Imagen.jpg';
import { Col, Card, Row, Button } from 'react-bootstrap';

var sectionStyle = {
    minWidth: "100%",
    height: "100vh",
    backgroundImage: "url(" + Background + ")",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
};

class NotFound extends Component {

    constructor(){
        super();
        this.state= {
            volver : false
        }
    }

    salir = () =>{
        this.setState({
            volver:true
        })
    }

    volver(){
        if(this.state.volver){
            return <Redirect to="/"></Redirect>
        }
    }



    render() {
        return (
            <div role="main">
                <section style={sectionStyle}>
                    <Row>
                        <Col></Col>
                    </Row>
                    <Row>
                        <Col md={4}></Col>
                        <Col md={{ span: 3, offset: 4 }} style={{
                            position: "absolute",
                            top: "160px",
                            bottom: "0px",
                            left: "400px",
                            right: "50px",
                        }}>
                            <Card>
                                <Card.Header>404 No Encontrado</Card.Header>
                                <Card.Body>
                                    <Card.Title>
                                        <h1>Ops, algo salio mal</h1>
                                    </Card.Title>
                                    <Card.Text>
                                        La ruta que estas buscando no existe pero puedes regresar a nuestra pagina principal
                                    </Card.Text>
                                    <Button
                                        id="qsLogoutBtn"
                                        className="btn btn-danger btn-lg"
                                        onClick={this.salir}
                                    >
                                        Regresar
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        {this.volver()}
                    </Row>
                </section>

            </div>
        );
    }
}

export default NotFound;