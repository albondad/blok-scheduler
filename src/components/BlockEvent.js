import React from 'react';
import Auxiliary from './Auxiliary'

let blockEvent = (props) => {
  let getFormattedTimeFromSeconds = (time) => {
    let hours = Math.floor(time / 3600);
    let minutes = Math.floor((time - hours * 3600) / 60);

    hours = hours - (time > 46800 ?  12 : 0 );

    hours = hours.toString().length === 1 ? hours = '0' + hours : hours;
    minutes = minutes.toString().length === 1 ? minutes = '0' + minutes : minutes;

    let meridiem = time >= 43200 ? 'PM' : 'AM';

    return hours + ":" + minutes + ' ' + meridiem;
  }

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
          : <div className='blockEvent-duration'>{getFormattedTimeFromSeconds(props.startTime)} to {getFormattedTimeFromSeconds(props.endTime)}</div>
        }
      </div>
      <div className='blockEvent-icon col-3 p-0 d-flex align-items-center justify-content-end'><i className="far fa-trash-alt fa-fw" onClick={() => props.onClick(props.index)}></i></div>
    </Auxiliary>
  )
}

export default blockEvent;
