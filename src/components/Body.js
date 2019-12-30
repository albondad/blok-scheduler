import React from 'react';
import Auxiliary from './Auxiliary'
import Logo from './Logo';
import Authentication from './Authentication';
import FormAddSchedule from './FormAddSchedule'
import ScheduleViewer from './ScheduleViewer';
import About from './About';

let body = (props) => {
  return(
    <section id='body'>
      {
        //loading animation
        props.loading ?
        <Auxiliary>
          <div className='d-flex justify-content-center'><div className="lds-ring"><div></div><div></div><div></div><div></div></div></div>
          <br />
          <div id='text-loading' className='text-center'>please wait...</div>
        </Auxiliary>
        : null
      }
      {
        //shows authentication forms
        !props.isAuthenticated && !props.loading ?
        <Auxiliary>
          <Logo />
          <Authentication functions={props.functions}/>
        </Auxiliary>
        : null
      }
      {
        //shows about page
        props.isAuthenticated && props.showAbout ?
        <About /> :
        null
      }
      {
        //showss body backdrop
        props.showBodyBackdrop ?
        <div id='body-backdrop'></div>
        : null
      }
      {
        //shows schedule viewer
        props.isAuthenticated && !props.showAbout && props.schedules.length && props.schedules[props.schedulesIndex] ?
        <Auxiliary>
          <div id='body-title'>{props.schedules[props.schedulesIndex].name}</div>
          <ScheduleViewer
              schedules={props.schedules}
              schedulesIndex={props.schedulesIndex}
              functions={props.functions}
          />
        </Auxiliary>
        : null
      }
      {
        //checks if there's no schedules
        props.isAuthenticated && !props.schedules.length && !props.showAbout ?
        <Auxiliary>
          <div className='text-title'>You don't have any schedules!</div>
          <button onClick={() => props.functions.showModal(
            <FormAddSchedule
              functions={props.functions}
            />
          )}>Create Schedule</button>
        </Auxiliary>
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
