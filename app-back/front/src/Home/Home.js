import React, { Component } from 'react';

class Home extends Component {
  login() {
    this.props.auth.login();
  }
  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="container">
        {
          isAuthenticated() && (
              <h4>
                Estas logeado!
              </h4>
            )
        }
        {
          !isAuthenticated() && (
              <h4>
                No estas logeado! Por favor{' '}
                <a style={{ cursor: 'pointer' }}
                  onClick={this.login.bind(this)}>
                  Ingresa
                </a>
                {' '} para continuar.
              </h4>
            )
        }
      </div>
    );
  }
}

export default Home;