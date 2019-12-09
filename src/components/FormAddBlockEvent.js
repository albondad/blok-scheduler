import React from 'react';

let formAddBlockEvent = (props) => {
  const onClick = (event) => {
    event.preventDefault();
    let eventName = event.target.parentNode['eventName'].value;

    // gets start time in seconds
    let startTimeArray = event.target.parentNode['startTime'].value.split(':');
    let startTime = startTimeArray[0] * 3600 + startTimeArray[1] * 60;

    // gets end time in seconds
    let endTimeArray = event.target.parentNode['endTime'].value.split(':');
    let endTime = endTimeArray[0] * 3600 + endTimeArray[1] * 60;

    //creating block event
    props.functions.createBlockEvent(eventName, startTime, endTime)
    props.functions.hideModal();
  }

  return (
    <form>
      <div className='form-title' onClick={props.backOnClick}>ADD EVENT</div>
      <div className='form-label' onClick={props.backOnClick}>Event Name</div>
      <input name='eventName' type='text' placeholder='name'/>
      <div className='form-label' onClick={props.backOnClick}>Start Time</div>
      <input name='startTime' type='time' placeholder='name'/>
      <div className='form-label' onClick={props.backOnClick}>End Time</div>
      <input name='endTime' type='time' placeholder='name'/>
      <button onClick={onClick}>Submit</button>
    </form>
  )
}

export default formAddBlockEvent;
