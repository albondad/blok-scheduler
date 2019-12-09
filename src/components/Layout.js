import '../index.css'

import firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/firestore'

import React, {Component} from 'react'
import Auxiliary from './Auxiliary';
import Body from './Body';
import Navigation from './Navigation';
import Modal from './Modal';

class Layout extends Component {
  state = {
    isAuthenticated: false,

    showModal: false,
    modalContent: null,

    schedules: [],
    schedulesIndex: 0,
  }

  //authentication functions
  signUpWithEmailAndPassword = (email, password) => {
    console.log('[signUpWithEmailAndPassword] function called');
    firebase.auth().createUserWithEmailAndPassword(email, password).then(credentials => {
      firebase.firestore().collection('users').doc(credentials.user.uid).set({schedules: []});
    });
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
  //modal functions
  showModal = (modalContent) => {
    this.setState({
      showModal: true,
      modalContent: modalContent
    })
  }
  hideModal = () => {
    this.setState({showModal: false});
  }
  //schedule functions
  setScheduleIndex = (index) => {
    console.log('index');
    console.log(index);
    this.setState({schedulesIndex: index})
  }
  createSchedule = (name) => {
    console.log('[createSchedule] function called');
    if (name) {
      let schedules = this.state.schedules;
      let newSchedule = {name: name, blockEvents: []};
      schedules.push(newSchedule);
      console.log(firebase.auth().currentUser.uid)
      firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).set({schedules: schedules});
      this.setState({schedules: schedules});
    }
  }
  deleteSchedule = () => {
    console.log('[deleteSchedule] function called')
    let schedules = this.state.schedules;
    schedules.splice(this.state.schedulesIndex, 1);
    this.setState({schedules: schedules});
    firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).set({schedules: schedules});
  }
  //block event functions
  createBlockEvent = (name, startTime, endTime) => {
    console.log('[createBlockEvent] function called')
    let schedules = this.state.schedules;
    schedules[this.state.schedulesIndex].blockEvents.push({name: name, startTime: startTime, endTime: endTime});
    this.setState({schedules: schedules});
    firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).set({schedules: schedules});
  }

  componentDidMount = () => {
    //setting up firebase
    let firebaseConfig = {
      apiKey: "AIzaSyBB30ofyXHheFy8S0eLnR3QgTN04VnEoK8",
      authDomain: "blok-scheduler.firebaseapp.com",
      databaseURL: "https://blok-scheduler.firebaseio.com",
      projectId: "blok-scheduler",
      storageBucket: "blok-scheduler.appspot.com",
      messagingSenderId: "159652400564",
      appId: "1:159652400564:web:99a408307246c130adf6e1",
      measurementId: "G-JGZKLB48VW"
    };
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

    //checks if a user logged in or not
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('[onAuthStateChanged] user logged in');
        this.setState({isAuthenticated: true});
        firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get().then(snapshot => {
          this.setState({schedules: snapshot.data().schedules})
        })
      } else {
        console.log('[onAuthStateChanged] user logged out');
        this.setState({isAuthenticated: false});
      }
    });

    //setting schedules

  }

  render() {
    return(
      <Auxiliary>
        {
          this.state.showModal ?
          <Modal
            onClick={this.hideModal}
            modalContent={this.state.modalContent}
          />
          : null
        }

        {
          this.state.isAuthenticated ?
          <Navigation
            schedules={this.state.schedules}
            functions={{
              showModal: this.showModal,
              hideModal: this.hideModal,
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
            showModal: this.showModal,
            hideModal: this.hideModal,
            deleteSchedule: this.deleteSchedule,
            createBlockEvent: this.createBlockEvent,
          }}
        />
      </Auxiliary>
    )
  }
}

export default Layout
