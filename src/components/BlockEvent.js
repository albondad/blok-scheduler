import React from 'react';
import Auxiliary from './Auxiliary'

let blockEvent = (props) => {
  return(
    <Auxiliary>
      <div className='col-9 p-0'>
        {
          props.name === undefined ?
          <div className='blockEvent-title'>EVENT TITLE</div>
          : <div className='blockEvent-title'>{props.name}</div>
        }
        {
          props.name === undefined ?
          <div className='blockEvent-duration'>00:00 to 00:00</div>
          : <div className='blockEvent-duration'>{props.duration}</div>
        }
      </div>
      <div className='blockEvent-icon col-3 p-0 d-flex align-items-center justify-content-end'><i className="far fa-trash-alt fa-fw"></i></div>
    </Auxiliary>
  )
}

export default blockEvent;
