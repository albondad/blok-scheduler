import React from 'react';
import Auxiliary from './Auxiliary';
import BlockEvent from './BlockEvent';

let blockEvents = (props) => {
  let addBlockEvent = () => {
    props.functions.showModal();
    props.functions.createBlockEvent();
  }

  let renderBlockEvents = () => {
    console.log(props.schedules.length === 0);
    if (props.schedules.length === 0) {
      return null;
    }
    else {
      console.log(props.schedules[0].blockEvents)
      return (
        props.schedules[props.schedulesIndex].blockEvents.map(blockEvent => {
          return (
            <BlockEvent
              name={blockEvent.name}
              duration={blockEvent.startTime}
            />
          )
        })
      )
    }
  }

  return(
    <Auxiliary>
      <div id='scheduleViewer-containerBlockEvents' className='container-fluid'>
      <div id='scheduleViewer-titleSchedule'>Schedule</div>
        <div className='row m-0'>
          {}
          <BlockEvent
            name={'asdfasdf'}
            duration={'asdfasdf'}
          />
          <BlockEvent
            name={'asdfasdf'}
            duration={'asdfasdf'}
          />
        </div>
        <div id='scheduleViewer-addBlockEvent' className='col-12 p-0' onClick={addBlockEvent}>Add Event <i className="fas fa-plus fa-fw"></i></div>
      </div>
    </Auxiliary>
  )
}

export default blockEvents;
