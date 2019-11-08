import React, { Component } from 'react';
import {CardDeck} from 'react-bootstrap';
import Servicio from './servicio';

class ListServicios extends Component {

    constructor(props){
        super(props);
        this.state ={
            list : this.props.list
        }
    }

    renderServicios(){
        var j=[]
        var u=this.props.list;
        for(var i=0; i<u.length;i++){
            j.push({id:u[i]})
        }
        
        return j.map((e,i) => ( 
            <Servicio value={e} key={i}></Servicio>
        ));
    }

    

    render() {
        return (
            <div>
                <CardDeck>
                    {this.renderServicios()}
                </CardDeck>
            </div>
        );
    }
}

export default ListServicios;