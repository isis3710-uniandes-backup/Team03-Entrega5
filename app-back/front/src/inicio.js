import React, { Component } from 'react';
import Background from './images/Imagen.jpg';
import { Col, Card, Row, Button } from 'react-bootstrap';


var sectionStyle = {
    minWidth: "100%",
    height: "100vh",
    backgroundImage: "url(" + Background + ")",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
};

class Inicio extends Component {
    signup() {
        this.props.auth.signup();
    }
    render() {
        return (
            <div role="main">
                <section style={sectionStyle} >
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
                                <Card.Body>
                                    <Card.Title>
                                        <h1>Bienvenido a PineBicis</h1>
                        </Card.Title>
                                    <Card.Text>
                                        En nuestro sitio tienes la oportunidad de conocer mas personas amantes de las bicicletas como tu.
                        </Card.Text>
                                    <Card.Text>
                                        Registrate ya!
                        </Card.Text>
                                    <Button
                                        id="qsLogoutBtn"
                                        className="btn btn-danger btn-lg"
                                        onClick={this.signup.bind(this)}
                                    >
                                        Registrate
                  </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                </section>
            </div>
        );
    }
}

export default Inicio;