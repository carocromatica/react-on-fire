import React, { Component } from 'react';
import './App.css';
import AuthWhithGoogle from './AuthWhithGoogle';
import AuthWithEmailAndPassword from './AuthWithEmailAndPassword';
import RegisterWithFirebase from './RegisterWithFirebase';

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

 class App extends Component {
 constructor() { 
  super();
   this.state = {  
     user: null
  };   
   this.handleAuthWithFacebook = this.handleAuthWithFacebook.bind(this);
  this.handleLogout = this.handleLogout.bind(this);
  this.renderLoginButton = this.renderLoginButton.bind(this);
 }
 componentWillMount () {
  firebase.auth().onAuthStateChanged(user => {
      this.setState({user});
  });
}
   handleAuthWithFacebook () {
    const provider = new firebase.auth.FacebookAuthProvider();
     firebase.auth().signInWithPopup(provider)
        .then(result => console.log(`${result.user.email} ha iniciado sesión`))
        .catch(error => console.log(`error ${error.code}: ${error.message}`));
 }
 handleLogout(){
  firebase.auth().signOut()
  .then(result => console.log(`${result.user.email} ha salido`))
  .catch(error => console.log(`error ${error.code}: ${error.message}`));
}
 renderLoginButton () {
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
      <button className="btn pink lighten-1 z-depth-0" onClick={this.handleAuthWithFacebook}>Login con Facebook</button>
      );
  }
}
 // display users in my template
  render() {
    return (
      <div className="App">
        
        <h1>{this.state.users}</h1> 
        <div className=''>
  
          
        </div>
            <div className=''>
               {this.renderLoginButton()}
            </div>
            <AuthWhithGoogle />
            <AuthWithEmailAndPassword />
            <RegisterWithFirebase />
      </div>
    );
  }
}
 export default App;