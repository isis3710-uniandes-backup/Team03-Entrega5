import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Background from './images/Imagen.jpg';
import { Col, Card, Row, Button } from 'react-bootstrap';
import {FormattedMessage} from 'react-intl';

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
                                <Card.Header><FormattedMessage id="NoEncontrado"/></Card.Header>
                                <Card.Body>
                                    <Card.Title>
                                        <h1><FormattedMessage id="Ops"/></h1>
                                    </Card.Title>
                                    <Card.Text>
                                        <FormattedMessage id="LaRutaNoExiste"/>
                                    </Card.Text>
                                    <Button
                                        id="qsLogoutBtn"
                                        className="btn btn-danger btn-lg"
                                        onClick={this.salir}
                                    >
                                        <FormattedMessage id="RegresarB"/>
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