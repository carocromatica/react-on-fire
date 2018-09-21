import React, { Component } from 'react';
import './App.css';
//import * as firebase from 'firebase';


//ES Modules:
 import firebase from 'firebase/app';
import 'firebase/auth';


class RegisterWithFirebase extends Component {

constructor() { 
  super();

  this.state = {  

    user: null
  };   

  this.registerWithFirebase = this.registerWithFirebase.bind(this);
 
}
  //Registro
registerWithFirebase() {
    const emailValue = document.getElementById('emailR').value;
	const passwordValue = document.getElementById('passwordR').value;
    const nameValue = document.getElementById("name").value;

    firebase.auth().createUserWithEmailAndPassword(emailValue, passwordValue)
        .then((result) => {
            console.log("Usuario creado con éxito");
            let user = firebase.auth().currentUser;
            user.updateProfile({ displayName: nameValue })
                .then(() => {
                    localStorage.setItem("user", JSON.stringify(user));
                })
                .catch((error) => {
                    console.log(error)
                })
        })
        .catch((error) => {
            console.log("Error de firebase > Código > " + error.code);
            console.log("Error de firebase > Mensaje > " + error.message);
        });
}

renderRegisterButton () {
  // si el usuario está logueado
  if (this.state.user) {
      return (
          <div>
              <img width='100' src={this.state.user.photoURL} alt={this.state.user.displayName}/>
              <p>Hola {this.state.user.displayName}!</p>
          </div>
      );
  }else{
      return(
      // si no está logueado
      <div>
         
      <input type='text' id='name' placeholder='name'/>
      <input type='email' id='emailR' placeholder='email'/>
        <input type='password' id='passwordR' placeholder='password'/>
        <button className="btn pink lighten-1 z-depth-0" onClick={this.registerWithFirebase}>Registrar</button>
       
      </div>
      );
  }
}

// display users in my template
  render() {
    return (
      <div className="App">
          <h4>crea una cuenta</h4>
        {this.renderRegisterButton()}
      </div>
    );
  }
}

export default RegisterWithFirebase;
