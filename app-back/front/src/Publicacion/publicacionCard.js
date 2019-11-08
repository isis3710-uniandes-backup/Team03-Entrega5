import React from 'react';
import {Button} from 'react-bootstrap';


 class PublicacionCard extends React.Component {
  state={
    contenido: this.props.value.contenido,
    fecha : this.props.value.fecha,
    likes: this.props.value.likes,
    updated: false
}




updateLikes = () => {

  if(!this.state.updated) {

    this.setState((prevState, props) => {
      return {
        likes: prevState.likes + 1,
        updated: true, 
      };
    });
    let data ={
      
      "contenido": this.state.contenido,
      "fecha": this.state.fecha,
      "likes": this.state.likes + 1
    };
    console.log(data);
    /*
    fetch('/:grupo/', {
      method: 'PUT', 
      body: JSON.stringify(data), 
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response =>{ console.log('Success:', response);
    
  });
*/
  }
  this.setState((prevState, props) => {
    return {
      updated: false, 
    };
  });
}

      render() {
        return (
<div>
  <div className="container-fluid">
    <section className="content">
      <div className="container">
         <div className="row">
          <div className='col-lg-8 col-md-8'>
           
            <div className="post">
              <div className="wrap-ut pull-left">
                <div className="userinfo pull-left">
                  <div className="avatar">
                    <img className="imagen" src="https://img.icons8.com/bubbles/2x/user.png" alt="Icon"/>
                  </div>
                </div>
                <div className="posttext pull-left">
                <h6 className="date">{this.state.fecha}</h6>
                <h5>{this.state.contenido}</h5>

                <Button className="btn btn-danger btn-lg btn-xs" 
                

onClick={this.updateLikes}>Like {this.state.likes}

    
  </Button>
                
                <div>
        
      </div>
              </div>
            
              </div>

              <div className="clearfix">
              </div>
        
           
            </div>
            


          </div>
          <div className='col-lg-4 col-md-4'>
            
          </div>
         </div>
      </div>
    </section>

  </div>
</div>
);
}
}
export default PublicacionCard;
				              