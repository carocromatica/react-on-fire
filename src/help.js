import React, { Component } from 'react';
import './App.css';
import  firebase from 'firebase';


class App extends Component {

constructor() { // 1st step to set state is to create a constructor
  super();

  this.state = {  // initialize the state property
// empty object at first, but whatever that is contained inside this object is the state of our component
    users: null // property of users
  };   

  this.handleAuth = this.handleAuth.bind(this);
  this.handleLogout = this.handleLogout.bind(this);
  this.renderLoginButton = this.renderLoginButton.bind(this);

}

componentWillMount () {
  firebase.auth().onAuthStateChanged(user => {
      this.setState({user});
  });
}

// to change the state of my app, use a method componentDidMount()
  componentDidMount() { // it's a life cycle method of the component and it's called only once
// inside of this method  I'm going to change the state
  const rootRef = firebase.database().ref().child('react'); // i'm treating the child f react as my root database, but this isn't really the root of my database, but i'm going to pretend that it is
  const usersRef = rootRef.child('users'); // reference to users
  usersRef.on('value', snap => { // real-time listener returns a callback function that returns me a snapshot
// the on method is what allows us to synchronize data in real time, and we always attach it onto a reference that points at a spot in our database
// essentially everytime that the data changes at the location of users, provide this callback function that returns to us the new set of data.
      this.setState({
        users: snap.val() // i'm going to call users with snap.val()
      });
    }); 
  }


  handleAuth () {
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
              <img src={this.state.user.photoURL} alt={this.user.displayName}/>
              <p>Hola {this.state.user.displayName}!</p>
              <button onClick={this.handleLogout}>Salir</button>
          </div>
      );
  }else{
      return(
      // si no está logueado
      <button onClick={this.handleAuth}>Login con feibu</button>
      );
  }
}

// display users in my template
  render() {
    return (
      <div className="App">
        <h1>{this.state.users}</h1> 
        <div className='App-header'>
          <h2>Titulo</h2>
        </div>
            <p className='App-intro'>
                <button onClick={this.handleAuth}>Login con Feibu</button>
            </p>
      </div>
    );
  }
}

export default App;
