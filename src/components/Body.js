import React from 'react';
import Auxiliary from './Auxiliary'
import Logo from './Logo';
import Authentication from './Authentication';
import ScheduleViewer from './ScheduleViewer';

let body = (props) => {
  return(
    <section id='body'>
      {
        //showss authentication forms
        !props.isAuthenticated ?
        <Auxiliary>
          <Logo />
          <Authentication functions={props.functions}/>
        </Auxiliary>
        : null
      }
      {
        //showss schedule viewer
        props.isAuthenticated && props.schedules.length ?
        <ScheduleViewer
            schedules={props.schedules}
            schedulesIndex={props.schedulesIndex}
            functions={props.functions}
        />
        : null
      }
      {
        //showss
        props.isAuthenticated && !props.schedules.length ?
        <div className='text-title'>You don't have any schedules!</div>
        : null
      }
    </section>
  )
}

export default body;
