import React from 'react';

let formAuthentication = (props) => {
  const onClick = (event) => {
    event.preventDefault();
    let email = event.target.parentNode['email'].value;
    let password = event.target.parentNode['password'].value;
    props.buttonOnClick(email, password);
  }

  return (
    <form>
      <div className='formAuthentication-back' onClick={props.backOnClick}>back</div>
      <input name='email' type='email' placeholder='email'/>
      <input name='password' type='password' placeholder='password'/>
      <button onClick={onClick}>{props.buttonText}</button>
    </form>
  )
}

export default formAuthentication;
