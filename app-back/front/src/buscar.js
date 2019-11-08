import React, { Component } from 'react';
import Taller from './Taller/taller';

class Buscar extends Component {
    constructor(){
        super();
        this.state = {
            search : '',
            talleres: '',
        }
    }

    
    updateSearch(event) {
        this.setState({ search: event.target.value.substr(0, 20) });
    }



    filterList = (event) => {
        let items = this.state.talleres;
        items = items.filter((item) => {
            return item.nombre.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
        });
        this.setState({ talleres: items })
    }

    render() {

        let filtrados = this.state.talleres.filter(
            (taller) => {
                return taller.nombre.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
            }
        );

        return (
            <div>
                <div className="md-form mt-0">
                    <input className="form-control" type="text" placeholder="Search" aria-label="Search" value={this.state.search} onChange={(this.updateSearch.bind(this))} />
                </div>

                <hr></hr>
                <h2>Talleres</h2>

                <br></br>
                <div className="scro">
                    {filtrados.map((taller) => {
                        return <div className="col-6"><Taller key={taller._id} value={taller} /></div>
                    })}
                   
                </div>
            </div>
        );
    }
}

export default Buscar;