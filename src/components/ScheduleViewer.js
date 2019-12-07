import React from 'react';
import Countdown from './Countdown'
import BlockEvents from './BlockEvents';

let scheduleViewer = (props) => {
  return(
    <div>
      <Countdown />
      <BlockEvents
        schedules={props.schedules}
        schedulesIndex={props.schedulesIndex}
        functions={props.functions}
      />
      <div id='scheduleViewer-deleteSchedule' onClick={props.functions.deleteSchedule}>DELETE SCHEDULE</div>
    </div>
  )
}

export default scheduleViewer;
