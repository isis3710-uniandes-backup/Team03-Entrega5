import React, { Component } from 'react';
import {Card} from 'react-bootstrap';

class Servicio extends Component {

    UNSAFE_componentWillMount()
    {
         var id2=this.state.id;
         let m="/servicios/"+id2;
          fetch(m, {
                method: 'GET',
                headers : { 
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                 }
          
              }).then(data=>(data.json()).then(t=> {
                  

                this.setState({id:t._id, nombre: t.nombre, tipo:t.tipo}) }))
    }
    constructor(props){
        super(props);

        this.state={
            id:this.props.value.id,
            nombre:"",
            tipo:""
        }



    }

    
    render() {
        return (
            <div>
                <Card>
                    <Card.Body>
                    <Card.Title>
                        {this.state.nombre}
                    </Card.Title>
                    <Card.Text>
                        {this.state.tipo}
                    </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default Servicio;