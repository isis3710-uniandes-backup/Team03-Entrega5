import React, { Component } from 'react';
import { Card } from 'react-bootstrap';

class Robo extends Component {

   state={
            marca: this.props.value.marca,
            tipo: this.props.value.tipo,
            color: this.props.value.color,
            tamano: this.props.value.tamano,
            direccion: this.props.value.direccion
        }
    

    render() {
        return (
            <div>
                <Card>
                    <Card.Body>
                        <Card.Title>

                        </Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Marca</Card.Subtitle>
                        <Card.Text>
                            {this.state.marca}
                        </Card.Text>
                        <Card.Subtitle className="mb-2 text-muted">Tipo</Card.Subtitle>
                        <Card.Text>
                            {this.state.tipo}
                        </Card.Text>
                        <Card.Subtitle className="mb-2 text-muted">Color</Card.Subtitle>
                        <Card.Text>
                            {this.state.color}
                        </Card.Text>
                        <Card.Subtitle className="mb-2 text-muted">Tamaño</Card.Subtitle>
                        <Card.Text>
                            {this.state.tamano}
                        </Card.Text>
                        <Card.Subtitle className="mb-2 text-muted">Direccion en la cual ocurrio el robo</Card.Subtitle>
                        <Card.Text>
                            {this.state.direccion}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default Robo;