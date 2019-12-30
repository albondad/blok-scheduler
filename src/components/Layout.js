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

    showAbout: false,

    showBodyBackdrop: false,

    showModal: false,
    modalContent: null,

    schedules: [],
    schedulesIndex: 0,
  }

  //authentication functions
  signUpWithEmailAndPassword = (email, password) => {
    //console.log('[signUpWithEmailAndPassword] function called');
    firebase.auth().createUserWithEmailAndPassword(email, password).then(credentials => {
      firebase.firestore().collection('users').doc(credentials.user.uid).set({schedules: []});
    });
  }
  loginWithEmailAndPassword = (email, password) => {
    //console.log('[loginWithEmailAndPassword] function called');
    firebase.auth().signInWithEmailAndPassword(email, password);
  }
  loginWithGoogle = () => {
    //console.log('[loginWithGoogle] function called')
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(result => {
      //console.log('[loginWithGoogle] account chosen')
      firebase.firestore().collection('users').doc(result.user.uid).get().then(doc => {
        //console.log('checking for account');
        if (!doc.exists) {
          firebase.firestore().collection('users').doc(result.user.uid).set({schedules: []});
        }
      })
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
  //body functions
  toggleBodyBackdrop = () => {
    let showBodyBackdrop = this.state.showBodyBackdrop;
    this.setState({showBodyBackdrop: !showBodyBackdrop});
  }
  //about functions
  showAbout = () => {
    this.setState({showAbout: true})
  }
  hideAbout = () => {
    this.setState({showAbout: false});
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
    this.setState({schedulesIndex: index})
  }
  createSchedule = (name) => {
    //console.log('[createSchedule] function called');
    if (name) {
      let schedules = this.state.schedules;
      let key = new Date().getYear() + '' + new Date().getTime();
      let newSchedule = {name: name, blockEvents: [], key: key};
      schedules.push(newSchedule);
      //console.log(firebase.auth().currentUser.uid)
      firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).set({schedules: schedules});
      this.setState({schedules: schedules});
    }
  }
  deleteSchedule = () => {
    //console.log('[deleteSchedule] function called')
    let schedules = this.state.schedules;
    schedules.splice(this.state.schedulesIndex, 1);
    this.setState({schedules: schedules});
    firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).set({schedules: schedules});
  }
  //block event functions
  createBlockEvent = (name, startTime, endTime) => {
    //console.log('[createBlockEvent] function called');
    let schedules = this.state.schedules;
    let key = new Date().getYear() + '' + new Date().getTime();
    schedules[this.state.schedulesIndex].blockEvents.push({name: name, startTime: startTime, endTime: endTime, key: key});
    this.setState({schedules: schedules});
    firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).set({schedules: schedules});
  }
  deleteBlockEvent = (index) => {
    //console.log('[createBlockEvent] function called');
    //console.log('[createBlockEvent]', index);
    let schedules = this.state.schedules;
    schedules[this.state.schedulesIndex].blockEvents.splice(index, 1);
    this.setState({schedules: schedules});
    firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).set({schedules: schedules});
  }

  componentDidMount = () => {
    //setting up firebase
    let firebaseConfig = {
      apiKey: process.env.REACT_APP_API_KEY,
      authDomain: process.env.REACT_APP_AUTH_DOMAIN,
      databaseURL: process.env.REACT_APP_DATABASE_URL,
      projectId: process.env.REACT_APP_PROJECT_ID,
      storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
      appId: process.env.REACT_APP_APP_ID,
      measurementId: process.env.REACT_APP_MEASUREMENT_ID
    };
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

    //checks if a user logged in or not
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        //console.log('[onAuthStateChanged] user logged in');
        this.setState({isAuthenticated: true});
        firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get().then(snapshot => {
          if (snapshot.data() !== undefined) {
            this.setState({schedules: snapshot.data().schedules})
          }
        })
      } else {
        //console.log('[onAuthStateChanged] user logged out');
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
              toggleBodyBackdrop: this.toggleBodyBackdrop,
              showAbout: this.showAbout,
              hideAbout: this.hideAbout,
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
          showAbout={this.state.showAbout}
          showBodyBackdrop={this.state.showBodyBackdrop}
          schedules={this.state.schedules}
          schedulesIndex={this.state.schedulesIndex}
          functions={{
            signUpWithEmailAndPassword: this.signUpWithEmailAndPassword,
            loginWithEmailAndPassword: this.loginWithEmailAndPassword,
            loginWithGoogle: this.loginWithGoogle,
            loginWithFacebook: this.loginWithFacebook,
            showAbout: this.showAbout,
            hideAbout: this.hideAbout,
            showModal: this.showModal,
            hideModal: this.hideModal,
            createSchedule: this.createSchedule,
            deleteSchedule: this.deleteSchedule,
            createBlockEvent: this.createBlockEvent,
            deleteBlockEvent: this.deleteBlockEvent,
          }}
        />
      </Auxiliary>
    )
  }
}

export default Layout
