import React, { Component } from 'react';
import {FormattedMessage ,FormattedNumber, FormattedPlural} from 'react-intl';
import PublicacionCard from '../Publicacion/publicacionCard'

class GrupoDetailed extends Component {


    UNSAFE_componentWillMount() {
        let idGrupo = this.props.match.params.id;
        console.log(idGrupo);
        fetch("http://localhost:3001/back/grupos/" + idGrupo, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }

        }).then(data => (data.json()).then(grupo => { this.setState({ grupoNombre: grupo.nombre, publicacionesGrupo: grupo.publicaciones });
    
        localStorage.setItem('grupo', JSON.stringify({ grupoNombre: grupo.nombre, publicacionesGrupo: grupo.publicaciones }));
    }))
    }
    UNSAFE_componentDidMount() {

        if (!navigator.onLine) {
          if (localStorage.getItem('grupo') === null)
              this.setState({
                grupoNombre: '',
                publicacionesGrupo: [],
    
            });
          else{
            var u=JSON.parse(localStorage.getItem('grupo'));
              this.setState(u);
          }
      }
    }
    constructor(props) {
        super(props);
        this.state = {
            grupoNombre: '',
            publicacionesGrupo: [],

        }
    }
    render() {

        return (
            <div className="container mt-4">
                <div className="row">
                    <div className="col">

                    </div>


                    <div className="col-6">
                        <div className="jumbotron jumbotron-fluid">
                            <div className="container">
                                <h1>{this.state.grupoNombre}</h1>
                                <hr className="my-4"></hr>
                                <h2><FormattedMessage id="Publicaciones"/></h2>
                                {this.state.publicacionesGrupo.map((e, i) =>
                                    <PublicacionCard value={e} key={i}></PublicacionCard>
                                )}

                            </div>
                        </div>
                    </div>
                    <div className="col ">

                    </div>

                </div>

            </div>
        );
    }
}

export default GrupoDetailed;