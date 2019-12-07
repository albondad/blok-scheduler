import React from 'react'
import Auxiliary from './Auxiliary'

const modal = (props) => {
  return (
    <Auxiliary>
      <div id='modal-backdrop' onClick={props.onClick}></div>
      <div id='modal-content'>{props.modalContent}</div>
    </Auxiliary>
  )
}

export default modal
