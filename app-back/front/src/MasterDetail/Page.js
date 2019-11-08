import React, { Component } from 'react';
import './styles.css';
import NavLink from 'react-bootstrap/NavLink';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { ListGroup, Row, Col } from 'react-bootstrap';

import Reportar from '../reportar';
import Grupo from '../Grupo/grupo';
import GrupoDetailed from '../Grupo/GrupoDetailed';
import User from '../User/User';
import ListRobos from '../listRobos';
import Taller from '../Taller/taller';
import TallerDetailed from '../Taller/tallerDetailed';


class Page extends Component {

    state = {


    }

    togo() {
        console.log("voy")
            ; this.preventDefault();
    }
    logout() {
        this.props.auth.logout();
    }


    handleOnClick = () => {
        console.log("voy");
        window.location.assign("/user");


    }
    render() {
        return (
            <div id="navPage" role="main">
                <Router>
                    <Row>
                        <Col xs={12} md={3} lg={3} className="App__Aside">
                            <ListGroup variant="flush" className="text-center">

                                <ListGroup.Item action className="List__Group" >

                                    <img src="https://i.ibb.co/2ZqqZ8t/icon3.png" className="img-fluid" alt="Institution" width="120" height="120"></img>

                                </ListGroup.Item>

                                <Link to={{ pathname: '/user', aboutProps: { auth: this.props.auth } }} >
                                    <ListGroup.Item action className="List__Group"  >
                                        <h5 style={{ color: '#8D99AE' }}>Perfil</h5>
                                    </ListGroup.Item>
                                </Link>
                                <Link to="/grupos" style={{ color: '#8D99AE' }}>
                                    <ListGroup.Item action className="List__Group"  >
                                        <h5 style={{ color: '#8D99AE' }}>Grupos</h5>
                                    </ListGroup.Item>
                                </Link>


                                <Link to="/reportar" style={{ color: '#8D99AE' }}>
                                    <ListGroup.Item action className="List__Group"  >
                                        <h5 style={{ color: '#8D99AE' }}>Reportar Robo</h5>
                                    </ListGroup.Item>

                                </Link>

                                <Link to="/robos" style={{ color: '#8D99AE' }}>

                                    <ListGroup.Item action className="List__Group"  >
                                        <h5 style={{ color: '#8D99AE' }}>Mis reportes</h5>
                                    </ListGroup.Item>

                                </Link>
                                <Link to="/talleres" style={{ color: '#8D99AE' }}>

                                    <ListGroup.Item action className="List__Group"  >
                                        <h5 style={{ color: '#8D99AE' }}>Talleres</h5>
                                    </ListGroup.Item>

                                </Link>

                                <ListGroup.Item action className="List__Group" >
                                    <NavLink onClick={this.logout.bind(this)} style={{ color: '#8D99AE' }}><h5 style={{ color: '#8D99AE' }}>Cerrar Sesión</h5></NavLink>
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col xs={12} md={9} lg={9} className="col-8 App__Form">
                            <Switch>
                                <Route exact path='/page/' render={(props) => <User auth={this.props.auth} {...props} />}></Route>
                                <Route exact path="/grupos/:id" render={(props) => <GrupoDetailed auth={this.props.auth} {...props} />} />
                                <Route path='/user' render={(props) => <User auth={this.props.auth} {...props} />}></Route>
                                <Route exact path='/talleres' render={(props) => <Taller auth={this.props.auth} {...props} />}></Route>
                                <Route exact path='/talleres/:id' render={(props) => <TallerDetailed auth={this.props.auth} {...props} />} />

                                <Route path='/reportar' render={(props) => <Reportar auth={this.props.auth} {...props} />}>
                                </Route>
                                <Route path="/grupos" render={(props) => <Grupo auth={this.props.auth} {...props} />}>
                                </Route>
                                <Route path="/robos" render={(props) => <ListRobos auth={this.props.auth} {...props} />} />

                            </Switch>
                        </Col>

                    </Row>
                </Router>
            </div>
        );
    }
}

export default Page;