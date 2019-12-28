import React from 'react';

let formAddSchedule = (props) => {
  const onClick = (event) => {
    event.preventDefault();
    let scheduleName = event.target.parentNode['scheduleName'].value;

    if (scheduleName !== '') {
      console.log('test')
      props.functions.createSchedule(scheduleName);
      props.functions.hideModal();
    }
  }

  return (
    <form>
      <div className='form-title' onClick={props.backOnClick}>SCHEDULE</div>
      <input name='scheduleName' type='text' placeholder='name'/>
      <button onClick={onClick}>Submit</button>
    </form>
  )
}

export default formAddSchedule;
