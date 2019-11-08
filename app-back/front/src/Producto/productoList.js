import React, { Component } from 'react';
import {CardDeck} from 'react-bootstrap';
import Producto from '../Producto/producto';

class ProductoList extends Component {

    constructor(props){
        super(props);
        this.state ={
            list : this.props.list
        }
    }
    render() {
        return (
            <div>
                <CardDeck>
                    {this.state.list.map((e,i)=> {
                        return <Producto value={e} key={i}></Producto>
                    })}
                </CardDeck>
            </div>
        );
    }
}

export default ProductoList;