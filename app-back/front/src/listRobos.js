import React, { Component } from 'react';
import { CardDeck } from 'react-bootstrap';
import Robo from './robo';
import {FormattedMessage} from 'react-intl';
import Chart from './chart';

class ListRobos extends Component {

    state={
            listRobos : []
        }
    

    UNSAFE_componentWillMount() {
        var m=JSON.parse(localStorage.getItem('user'));

        if (!navigator.onLine) {
            if (localStorage.getItem('robos') === null)
                this.setState({
                    listRobos : []
                })
            else{
              var u=JSON.parse(localStorage.getItem('robos'));
                this.setState(u);
            }
        }else{
        
        var str ="/robos/" + m.nickname + ""
        fetch(str).then(res => res.json()).then(lista => {
            console.log(lista);
            this.setState({
                listRobos: lista
            });
            localStorage.setItem('robos', JSON.stringify({
                listRobos: lista
            }));
        });
    }
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
                <h1><FormattedMessage id="Estadisticas"/></h1>
                <Chart></Chart>
            </div>
        );
    }
}

export default ListRobos;