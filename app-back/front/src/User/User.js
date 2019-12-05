import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import {FormattedMessage} from 'react-intl';

class User extends Component {
  state = {

    sub: "",
    nickname: "",
    name: "",
    picture: "",
    updated_at: "",
    email: "",
    email_verified: ""

  }

  componentDidMount() {

    if (!navigator.onLine) {
      if (localStorage.getItem('user') === null)
          this.setState({

            sub: "",
            nickname: "",
            name: "",
            picture: "",
            updated_at: "",
            email: "",
            email_verified: ""
        
          })
      else{
        var u=JSON.parse(localStorage.getItem('list'));
          this.setState({

            sub: u.sub,
            nickname: u.nickname,
            name: u.name,
            picture: u.picture,
            updated_at: u.updated_at,
            email: u.email,
            email_verified: u.email_verified
        
          });
      }
  }

    /**var persistState = localStorage.getItem('user');

    if (persistState) {
      try {
        this.setState(JSON.parse(persistState));
      } catch (e) {
        // is not json
      }
    }**/
  }

  componentWillUnmount() {
    localStorage.setItem('user', JSON.stringify(this.state));
  }

  login() {
    if ((this.props.location !== undefined) && (this.props.location.aboutProps !== undefined) && (this.props.location.aboutProps.auth !== undefined)) {
      this.props.location.aboutProps.auth.login();

    }
    else {
      this.props.auth.login();

    }
  }

  logout() {
    if ((this.props.location !== undefined) && (this.props.location.aboutProps !== undefined) && (this.props.location.aboutProps.auth !== undefined)) {
      this.props.location.aboutProps.auth.logout();
    }
    else {
      this.props.auth.logout();
    }

  }

  render() {
    var m = null;
    if ((this.props.location !== undefined) && (this.props.location.aboutProps !== undefined) && (this.props.location.aboutProps.auth !== undefined)) {
      m = this.props.location.aboutProps.auth;
    }
    else {
      m = this.props.auth;

    }
    const { isAuthenticated } = m;


    return (
      <div className="container">
        {
          isAuthenticated() && (



            <div className="row">

              <div className="col-5">
                <br></br>
                <div className="circular--square" >
                  <img src={this.state.picture} className="img-fluid" alt="Imagen perfil usuario." width="800" height="800" ></img>

                </div>

              </div>
              <div className="col-7">
                <br></br><br></br><br></br>
                <br></br><br></br>
                <div className="row">
                  <div className="col-7"><h1>{this.state.nickname} </h1> </div>
                  <div id="cerrar" className="col-5">

                    <Button className="btn btn-danger btn-lg"
                      onClick={this.logout.bind(this)}
                    >
                      <FormattedMessage id="Salir"/>
                  </Button>
                  </div>
                </div>
              </div>
              <div>
                <br></br>
                <br></br>
                <br></br>

                <table className="table table-borderless">
                  <thead>

                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row"><h2><FormattedMessage id="Usuario"/></h2></th>
                      <td> <h2>  {this.state.nickname} </h2></td>

                    </tr>
                    <tr>
                      <th scope="row"> <h2><FormattedMessage id="Correo"/> </h2></th>
                      <td> <h2> {this.state.name} </h2></td>

                    </tr>

                  </tbody>
                </table>

              </div>


            </div>

          )
        }

      </div>
    );
  }
}

export default User;