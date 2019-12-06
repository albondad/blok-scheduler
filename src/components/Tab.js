import React from 'react';

let tab = (props) => {
  return(
    <div className='row m-0 navigationBar-tab' onClick={props.onClick}>
      <div className='col-9 p-0'>{props.title}</div>
      <div className='col-3 p-0 text-right'>{props.icon}</div>
    </div>
  )
}

export default tab;
