import '../index.css'

import firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/firestore'

import React, {Component} from 'react'
import Auxiliary from './Auxiliary';
import Body from './Body';
import Navigation from './Navigation';

class Layout extends Component {
  state = {
    isAuthenticated: true,
    schedules: [],
    schedulesIndex: 0,
  }

  //authentication functions
  signUpWithEmailAndPassword = (email, password) => {
    console.log('[signUpWithEmailAndPassword] function called');
    firebase.auth().createUserWithEmailAndPassword(email, password);
  }
  loginWithEmailAndPassword = (email, password) => {
    console.log('[loginWithEmailAndPassword] function called');
    firebase.auth().signInWithEmailAndPassword(email, password);
  }
  loginWithGoogle = () => {
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(result => {
    let user = result.user;
    console.log(user.uid)
    }).catch(function(error) {
    });
  }
  loginWithFacebook = () => {
    let provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then(result => {
      let user = result.user;
    })
  }
  logout = () => {
    firebase.auth().signOut();
    this.setState({isAuthenticated: false});
  }
  //schedule selection
  setScheduleIndex = (index) => {
    console.log('index');
    console.log(index);
    this.setState({schedulesIndex: index})
  }
  createSchedule = () => {
    //console.log(this.state.schedules);
    let schedules = this.state.schedules;
    schedules.push({name: 'test01'});
    console.log(schedules);
    firebase.firestore().collection('users').doc('default').set({schedules: schedules});
  }

  componentDidMount = () => {
    //setting up firebase
    let firebaseConfig = {
        apiKey: "AIzaSyCJ4Pd4d98fLQ4JVTTzCCAoSXkCB6ZMKEw",
        authDomain: "block-scheduler-8aad1.firebaseapp.com",
        databaseURL: "https://block-scheduler-8aad1.firebaseio.com",
        projectId: "block-scheduler-8aad1",
        storageBucket: "block-scheduler-8aad1.appspot.com",
        messagingSenderId: "348383557430",
        appId: "1:348383557430:web:db5cbfb6d0084d9e926597",
        measurementId: "G-HX0Q2XGBPS"
    };
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

    //checks if a user logged in or not
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('[onAuthStateChanged] user logged in');
        this.setState({isAuthenticated: true});
      } else {
        this.setState({isAuthenticated: true});
      }
    });

    //setting schedules
    firebase.firestore().collection('users').doc('default').get().then(snapshot => {
      this.setState({schedules: snapshot.data().schedules})
    });
  }

  render() {
    return(
      <Auxiliary>
        {
          this.state.isAuthenticated ?
          <Navigation
            schedules={this.state.schedules}
            functions={{
              logout: this.logout,
              setScheduleIndex: this.setScheduleIndex,
              createSchedule: this.createSchedule,
            }}
          />
          : null
        }

        <Body
          isAuthenticated={this.state.isAuthenticated}
          schedules={this.state.schedules}
          schedulesIndex={this.state.schedulesIndex}
          functions={{
            signUpWithEmailAndPassword: this.signUpWithEmailAndPassword,
            loginWithEmailAndPassword: this.loginWithEmailAndPassword,
            loginWithGoogle: this.loginWithGoogle,
            loginWithFacebook: this.loginWithFacebook,
          }}
        />
      </Auxiliary>
    )
  }
}

export default Layout
