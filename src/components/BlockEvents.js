import React from 'react';
import Auxiliary from './Auxiliary';
import BlockEvent from './BlockEvent';
import FormAddBlockEvent from './FormAddBlockEvent';

let blockEvents = (props) => {
  let addBlockEvent = () => {
    props.functions.showModal(<FormAddBlockEvent functions={props.functions} schedule={props.schedules[props.schedulesIndex]}/>);
  }
  let getSortedBlockEvents = (array) => {
    for (let i = 0; i < array.length; i++) {
      let minimum = array[i]
      for (let j = i; j < array.length; j++) {
        //console.log(array[j].name + " compared to " + minimum.name )
        if (array[j].startTime < minimum.startTime) {
          minimum = array[j];
          array.splice(j, 1);
          array.unshift(minimum);
        }
      }
    }
    return array;
  }

  let renderBlockEvents = () => {
    if (props.schedules.length === 0 || props.schedules[props.schedulesIndex] === undefined) {
      return null;
    }
    else {

      return (
        getSortedBlockEvents(props.schedules[props.schedulesIndex].blockEvents).map((blockEvent, index) => {
          return (
            <BlockEvent
              name={blockEvent.name}
              startTime={blockEvent.startTime}
              endTime={blockEvent.endTime}
              index={index}
              onClick={props.functions.deleteBlockEvent}
              key={blockEvent.key}
            />
          )
        })
      )
    }
  }

  return(
    <Auxiliary>
      <div id='scheduleViewer-containerBlockEvents' className='container-fluid'>
      <div id='scheduleViewer-titleSchedule'>{props.schedules[props.schedulesIndex].name}</div>
        <div className='row m-0'>
          {renderBlockEvents()}
        </div>
        <div id='scheduleViewer-addBlockEvent' className='col-12 p-0' onClick={addBlockEvent}>Add Event <i className="fas fa-plus fa-fw"></i></div>
      </div>
    </Auxiliary>
  )
}

export default blockEvents;
