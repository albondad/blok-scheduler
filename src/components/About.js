import React from 'react'

let about = () => {
  return (
    <div>
      <h2>About</h2>
      <p>A tool used to keep real time track of current or upcoming events that occur throughout the day that follow a block schedule type pattern (eg: school events, job shifts, etc.)</p>
      <br />
      <h2>Schedules</h2>
      <p>Schedules are where you store your events for day to day activities! You can create a schedule by going to the Menu and selecting 'Add Schedule,' or delete a schedule by clicking 'Delete Schedule' at the bottom of the page of the selected schedule.</p>
      <br />
      <h2>Events</h2>
      <p>Events are the tasks or activites that are stored in a schedule and occure throughout the day. Each event has a name, a start time, and an end time. You can create events after selecting a schedule and selecting 'Add Event', or delete an event by clicking the trash icon.</p>
      <br />
      <h2>Sharing</h2>
      <p>You can share you schedules with friends or family by creating an account meant for sharing, or just log into the friend or family members device.</p>
    </div>
  )
}

export default about
