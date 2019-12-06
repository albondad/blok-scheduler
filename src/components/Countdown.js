import React from 'react';
import BlockEvent from './BlockEvent'

let countdown = (props) => {
  return(
    <div id='scheduleViewer-containerCountdown'>
      <div id='scheduleViewer-titleCountdown'>Event Title</div>
      <div id='scheduleViewer-durationCountDown'>00:00 to 00:00</div>
      <div id='scheduleViewer-textCountdown'>00:00:00</div>
    </div>
  )
}

export default countdown;
