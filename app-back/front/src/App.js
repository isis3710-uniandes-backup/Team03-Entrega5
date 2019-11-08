import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import './App.css';
import Page from './MasterDetail/Page';
import Home from './home';

class App extends Component {
  goTo(route) {
    this.props.history.replace(`/${route}`)
  }
  signup() {
    this.props.auth.signup();
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  componentDidMount() {
    const { renewSession } = this.props.auth;

    if (localStorage.getItem('isLoggedIn') === 'true') {
      renewSession();
    }
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div>
      
      </div>
    );
  }
}

export default App;