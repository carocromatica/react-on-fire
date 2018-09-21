import React, { Component } from 'react';
import './App.css';
import  firebase from 'firebase';


class App2 extends Component {

constructor() { // 1st step to set state is to create a constructor
  super();

  this.state = {  // initialize the state property
// empty object at first, but whatever that is contained inside this object is the state of our component
    users: null // property of users
  };   

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


// display users in my template
  render() {
    return (
      <div className="App">
        <h1>{this.state.users}</h1> 
        <div className='App-header'>
          <h2>Titulo</h2>
        </div>
            <p className='App-intro'>
               
            </p>
      </div>
    );
  }
}

export default App2;
