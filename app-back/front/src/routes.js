import React from 'react';
import { Route, Router } from 'react-router-dom';
import Home from './home';
import Page from './MasterDetail/Page';
import Callback from './Callback/Callback';
import Auth from './Auth/Auth';
import history from './history';
import Reportar from './reportar';
import User from './User/User';
import Taller from './Taller/taller'
import Publicacion from './Publicacion/publicacionList'

import TallerDetailed from './Taller/tallerDetailed'
import {IntlProvider} from 'react-intl';

import localeEsMessages from "./locales/es";
import localeEnMessages from "./locales/en";

let idioma= ()=>{
    console.log(navigator.language||navigator.browserLanguage)
    return navigator.language||navigator.browserLanguage;
}

let messages =() =>{

    if(idioma() ==="es" || idioma()==="es-ES"){
        return localeEsMessages;
    }
    else if(idioma() === "en"){
        return localeEnMessages;
    }
}

const auth = new Auth();

const handleAuthentication = ({location}) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
}

export const makeMainRoutes = () => {
  return (
  <IntlProvider locale={idioma()} messages= {messages()}>
      <Router history={history}>
        <div>
          <Route path="/" render={(props) => <Home auth={auth} {...props} />} />
          <Route path="/home" render={(props) => <Home auth={auth} {...props} />} />
          <Route path="/page" render={(props) => <Page auth={auth} {...props} />} />
          <Route path='/user'render={(props) => <User auth={auth} {...props} />} />
          <Route path='/reportar' render={(props) => <Reportar auth={auth} {...props} />} />
          <Route exact path = '/talleres' render ={(props)=><Taller auth={auth} {...props}/>}/> 
          <Route exact path = '/publicaciones' render ={(props)=><Publicacion auth={auth} {...props}/>}/> 
          <Route exact path = '/talleres/:id' render ={(props)=><TallerDetailed auth={auth} {...props}/>}/>            
          <Route path="/callback" render={(props) => {
            handleAuthentication(props);
            return <Callback {...props} /> 
            
          }}/>
        </div>
      </Router>
      </IntlProvider>
  );
}