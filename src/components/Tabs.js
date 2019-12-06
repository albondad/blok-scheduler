import React from 'react';
import Auxiliary from './Auxiliary'
import Tab from './Tab'

let tabs = (props) => {
  const renderSchedules = () => {
    props.schedules.map((schedule, index) => {
      return(
        <Tab
          title={schedule.name}
          icon={<i className="fas fa-clipboard-list fa-fw"></i>}
          onClick={() => props.functions.setScheduleIndex(index)}
        />
      )
    });
  }
  return(
    <Auxiliary>
      <Tab
        title={'About'}
        icon={<i className="fas fa-info fa-fw"></i>}
      />
      <Tab
        title={'Logout'}
        icon={<i className="fas fa-user fa-fw"></i>}
        onClick={props.functions.logout}
      />
      {renderSchedules}
      <Tab
        title={'Add Schedule'}
        icon={<i className="fas fa-plus fa-fw"></i>}
        onClick={props.functions.createSchedule}
      />
    </Auxiliary>
  )
}

export default tabs;
