import React, {Component} from 'react';
import Auxiliary from './Auxiliary'
import AuthenticationForm from './AuthenticationForm';

class Authentication extends Component {
  state = {
    // 0 - options
    // 1 - sign up
    // 2 - login
    show: 0
  }

  setShow = (value) => {
    this.setState({show: value})
  }

  render() {
    return(
      <div>
        {
          this.state.show === 0 ?
          <Auxiliary>
            <button onClick={() => this.setShow(1)}>Sign Up</button>
            <button onClick={() => this.setShow(2)}>Login</button>
            <button className='google' onClick={this.props.functions.loginWithGoogle}><i className="fab fa-google"></i>  google</button>
            <button className='facebook' onClick={this.props.functions.loginWithFacebook}><i className="fab fa-facebook-f"></i>  facebook</button>
          </Auxiliary>
          : null
        }
        {
          this.state.show === 1 ?
          <AuthenticationForm
            buttonText='sign up'
            backOnClick={() => this.setShow(0)}
            buttonOnClick={this.props.functions.signUpWithEmailAndPassword}
          />
          : null
        }
        {
          this.state.show === 2 ?
          <AuthenticationForm
            buttonText='login'
            backOnClick={() => this.setShow(0)}
            buttonOnClick={this.props.functions.loginWithEmailAndPassword}
          />
          : null
        }
      </div>
    )
  }
}

export default Authentication;
