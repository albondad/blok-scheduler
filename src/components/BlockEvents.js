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
      <div className='container-fluid body-header text-uppercase'>
        <div className='row'>
          <div className='col-6'>Schedule</div>
          <div className='col-6 text-right'><i className="fas fa-clipboard fa-fw"></i></div>
        </div>
      </div>
      <div id='scheduleViewer-containerBlockEvents' className='container-fluid'>
      
      <div id='scheduleViewer-addBlockEvent' className='col-12 p-0' onClick={addBlockEvent}>Add Event <i className="fas fa-plus fa-fw"></i></div>
      <div className='row m-0'>
        {renderBlockEvents()}
      </div>
      </div>
    </Auxiliary>
  )
}

export default blockEvents;
