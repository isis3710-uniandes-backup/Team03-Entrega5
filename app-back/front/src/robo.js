import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import {FormattedMessage} from 'react-intl';

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
                        <Card.Subtitle className="mb-2 text-muted"><FormattedMessage id="Marca"/></Card.Subtitle>
                        <Card.Text>
                            {this.state.marca}
                        </Card.Text>
                        <Card.Subtitle className="mb-2 text-muted"><FormattedMessage id="Tipo"/></Card.Subtitle>
                        <Card.Text>
                            {this.state.tipo}
                        </Card.Text>
                        <Card.Subtitle className="mb-2 text-muted"><FormattedMessage id="Color"/></Card.Subtitle>
                        <Card.Text>
                            {this.state.color}
                        </Card.Text>
                        <Card.Subtitle className="mb-2 text-muted"><FormattedMessage id="Tamano"/></Card.Subtitle>
                        <Card.Text>
                            {this.state.tamano}
                        </Card.Text>
                        <Card.Subtitle className="mb-2 text-muted"><FormattedMessage id="Localidad"/></Card.Subtitle>
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