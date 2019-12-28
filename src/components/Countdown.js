import React, {Component} from 'react';

import Auxiliary from './Auxiliary';

class Countdown extends Component {
  state = {
    name: 'no events',
    duration: '00:00 AM to 00:00 PM',
    text: '00:00:00',
    current: false,
  }

  getCurrentBlockEvent = () => {
    if (this.props.schedules[this.props.schedulesIndex] !== undefined) {
      let currentDate = new Date();
      let currentTime = currentDate.getHours() * 3600 + currentDate.getMinutes() * 60 + currentDate.getSeconds();
      let blockEvents = this.props.schedules[this.props.schedulesIndex].blockEvents;
      let result = {};
      if (this.props.schedules[this.props.schedulesIndex].blockEvents.length === 0) {
        this.setState({
          name: 'no events',
          duration: '00:00 AM to 00:00 PM',
          text: '00:00:00',
          current: false,
        })
      }
      for (let i = 0; i < blockEvents.length; i ++) {
        if (currentTime < blockEvents[i].startTime) {
          this.setState({
            name: blockEvents[i].name,
            duration: this.getFormattedTimeFromSeconds(blockEvents[i].startTime, false, true) + ' to ' + this.getFormattedTimeFromSeconds(blockEvents[i].endTime, false, true),
            text: this.getFormattedTimeFromSeconds(Math.abs(currentTime - blockEvents[i].startTime), true, false),
            current: false,
          })
          break;
        }
        if (currentTime < blockEvents[i].endTime) {
          this.setState({
            name: blockEvents[i].name,
            duration: this.getFormattedTimeFromSeconds(blockEvents[i].startTime, false, true) + ' to ' + this.getFormattedTimeFromSeconds(blockEvents[i].endTime, false, true),
            text: this.getFormattedTimeFromSeconds(Math.abs(currentTime - blockEvents[i].endTime), true, false),
            current: true,
          })
          break;
        }
      }
    }
  }
  getFormattedTimeFromSeconds = (time, showSeconds, showMeridiem) => {
    let hours = Math.floor(time / 3600);
    let minutes = Math.floor((time - hours * 3600) / 60);
    let seconds = time - ((hours*3600) + (minutes*60));
    let meridiem = ''

    hours = hours - (time > 46800 ?  12 : 0 );

    hours = hours.toString().length === 1 ? hours = '0' + hours : hours;
    minutes = minutes.toString().length === 1 ? minutes = '0' + minutes : minutes;
    seconds = seconds.toString().length === 1 ? seconds = '0' + seconds : seconds;

    if (showMeridiem) {
      meridiem = time >= 43200 ? 'PM' : 'AM';
    }

    return hours + ":" + minutes + (showSeconds ? ':' + seconds : '') + ' ' + meridiem;
  }

  componentDidMount = () => {
    setInterval(this.getCurrentBlockEvent, 1000);
  }

  render() {
    return(
      <Auxiliary>
      <div className='body-header text-uppercase'>
        <div className='row'>
          <div className='col-6'>Schedule</div>
          <div className='col-6 text-right'><i className="fas fa-clock fa-fw"></i></div>
        </div>
      </div>
      <div id='scheduleViewer-containerCountdown'>

        <div id='scheduleViewer-titleCountdown'>{this.state.current ? this.state.name : 'Free Time'}</div>
        {/*<div id='scheduleViewer-occurenceCountdown'>{this.state.current ? 'current' : 'upcoming'}</div>*/}
        <div id='scheduleViewer-durationCountDown'>{this.state.current ? this.state.duration : null}</div>
        <div id='scheduleViewer-textCountdown'>{this.state.text}</div>
      </div>
      </Auxiliary>
    )
  }
}

export default Countdown;
