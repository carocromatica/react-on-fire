import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import firebase from 'firebase';
   // Initialize Firebase
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAD6tr14xLvyFMDrwTDAiKh6zoCN3BvNkc",
    authDomain: "synapse-react-on-fire.firebaseapp.com",
    databaseURL: "https://synapse-react-on-fire.firebaseio.com",
    projectId: "synapse-react-on-fire",
    storageBucket: "synapse-react-on-fire.appspot.com",
    messagingSenderId: "599883791971"
  };
  firebase.initializeApp(config);
 ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();