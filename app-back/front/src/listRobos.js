import React, { Component } from 'react';
import { CardDeck } from 'react-bootstrap';
import Robo from './robo';
import {FormattedMessage} from 'react-intl';

class ListRobos extends Component {

    state={
            listRobos : []
        }
    

    UNSAFE_componentWillMount() {
        var m=JSON.parse(localStorage.getItem('user'));

        var str ="/robos/" + m.nickname + ""
        fetch(str).then(res => res.json()).then(lista => {
            console.log(lista);
            this.setState({
                listRobos: lista
            });
        });
    }

    renderRobos() {
        return this.state.listRobos.map((e,i) => ( 
            <Robo value={e} key={i}></Robo>
        ));
      }

    render() {
        return (
            <div>
                <h1><FormattedMessage id="Reportes"/></h1>
                <CardDeck>
                    {this.renderRobos()}
                </CardDeck>
            </div>
        );
    }
}

export default ListRobos;