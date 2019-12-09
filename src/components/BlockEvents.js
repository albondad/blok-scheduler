import React from 'react';
import Auxiliary from './Auxiliary';
import BlockEvent from './BlockEvent';
import FormAddBlockEvent from './FormAddBlockEvent';

let blockEvents = (props) => {
  let addBlockEvent = () => {
    props.functions.showModal(<FormAddBlockEvent functions={props.functions}/>);
  }

  let renderBlockEvents = () => {
    if (props.schedules.length === 0 || props.schedules[props.schedulesIndex] === undefined) {
      return null;
    }
    else {
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
          {renderBlockEvents()}
        </div>
        <div id='scheduleViewer-addBlockEvent' className='col-12 p-0' onClick={addBlockEvent}>Add Event <i className="fas fa-plus fa-fw"></i></div>
      </div>
    </Auxiliary>
  )
}

export default blockEvents;
