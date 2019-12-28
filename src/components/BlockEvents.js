import React from 'react';
import Auxiliary from './Auxiliary';
import BlockEvent from './BlockEvent'

let blockEvents = (props) => {
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
        </div>
      </div>
    </Auxiliary>
  )
}

export default blockEvents;
