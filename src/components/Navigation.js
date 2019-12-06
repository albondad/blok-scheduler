import React from 'react';
import NavigationBar from './NavigationBar'

let navigation = (props) => {
  return(
    <section id='navigation'>
      <NavigationBar
        schedules={props.schedules}
        functions={props.functions}
      />
    </section>
  )
}

export default navigation;
