import React from 'react';
import Auxiliary from './Auxiliary';
import Countdown from './Countdown'
import BlockEvents from './BlockEvents';

let scheduleViewer = (props) => {
  return(
    <div>
      <Countdown />
      <BlockEvents
        schedules={props.schedules}
        schedulesIndex={props.schedulesIndex}
      />
      <div id='scheduleViewer-deleteSchedule'>DELETE SCHEDULE</div>
    </div>
  )
}

export default scheduleViewer;
