import React, { Component } from 'react';
import {FormattedMessage} from 'react-intl';

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
                <FormattedMessage id="Log"/>
              </h4>
            )
        }
        {
          !isAuthenticated() && (
              <h4>
                <FormattedMessage id="LogNo"/>{' '}
                <a style={{ cursor: 'pointer' }}
                  onClick={this.login.bind(this)}>
                  <FormattedMessage id="LogNo1"/>
                </a>
                {' '} <FormattedMessage id="LogNo2"/>
              </h4>
            )
        }
      </div>
    );
  }
}

export default Home;