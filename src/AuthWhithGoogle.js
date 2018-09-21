import React, { Component } from 'react';
import './App.css';
import  firebase from 'firebase';


class AuthWithGoogle extends Component {

constructor() { 
  super();

  this.state = {  

    user: null
  };   

  this.handleAuthWithGoogle = this.handleAuthWithGoogle.bind(this);

}

  handleAuthWithGoogle () {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
        .then(result => console.log(`${result.user.email} ha iniciado sesión`))
        .catch(error => console.log(`error ${error.code}: ${error.message}`));

}

renderLoginButtonG () {
  // si el usuario está logueado
  if (this.state.user) {
      return (
          <div>
              <img width='100' src={this.state.user.photoURL} alt={this.state.user.displayName}/>
              <p>Hola {this.state.user.displayName}!</p>
              <button onClick={this.handleLogout}>Salir</button>
          </div>
      );
  }else{
      return(
      // si no está logueado
      <button className="btn pink lighten-1 z-depth-0" onClick={this.handleAuthWithGoogle}>Login con Google</button>
      );
  }
}

// display users in my template
  render() {
    return (
      <div className="App">
        
        <div className='holi'>
        <h1>{this.state.users}</h1> 
        {this.renderLoginButtonG()}
        </div>
       
      </div>
    );
  }
}

export default AuthWithGoogle;
