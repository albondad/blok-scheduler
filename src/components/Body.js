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
        props.isAuthenticated && props.schedules.length && props.schedules[props.schedulesIndex] ?
        <ScheduleViewer
            schedules={props.schedules}
            schedulesIndex={props.schedulesIndex}
            functions={props.functions}
        />
        : null
      }
      {
        //checks if there's no schedules
        props.isAuthenticated && !props.schedules.length ?
        <div className='text-title'>You don't have any schedules!</div>
        : null
      }
      {
        //checks if there's no selected schedules
        props.isAuthenticated && !props.schedules[props.schedulesIndex] && props.schedules.length > 0 ?
        <div className='text-title'>You have no selected schedules</div>
        : null
      }
    </section>
  )
}

export default body;
