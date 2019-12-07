import React from 'react';
import Auxiliary from './Auxiliary'
import Logo from './Logo';
import Authentication from './Authentication';
import ScheduleViewer from './ScheduleViewer';

let body = (props) => {
  return(
    <section id='body'>
      {
        !props.isAuthenticated ?
        <Auxiliary>
          <Logo />
          <Authentication functions={props.functions}/>
        </Auxiliary>
        : <ScheduleViewer
            schedules={props.schedules}
            schedulesIndex={props.schedulesIndex}
            functions={props.functions}
          />
      }
    </section>
  )
}

export default body;
