import React, { Component } from 'react';
import PublicacionCard from './publicacionCard';

class PublicacionList extends Component {
    
    state={
        list: []
    
        
    }
    
    UNSAFE_componentDidMount(){
        if (!navigator.onLine) {
            if (localStorage.getItem('publicaciones') === null)
                this.setState({
                    list: []
                
                    
                })
            else{
              var u=JSON.parse(localStorage.getItem('publicaciones'));
                this.setState(u);
            }
        }
            else{
        fetch("/publicaciones/").then(res => res.json()).then(m=>{console.log(m);this.setState({
            list:m
            
        });
        localStorage.setItem('publicaciones', JSON.stringify({
            list: m
        }));
    
    });
}
    }
    
    UNSAFE_componentWillUnmount() {
        localStorage.setItem('publicaciones', JSON.stringify(this.state));
      }
  
    render() {
        
        return (
            <div className="row">
                <div className="container">
                    <h2>Publicaciones</h2>
                           {this.state.list.map((e,i)=>
                           
                              <PublicacionCard value={e} key={i}></PublicacionCard> )}
            </div>
            </div>
        );
    }
}



export default PublicacionList;