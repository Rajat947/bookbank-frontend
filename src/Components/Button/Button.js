import React from 'react'
import './Button.css'

function Btn(props) {
  let classes = "Button "+props.classes;
  return (
    <div className={classes} onClick={props.change}>{props.text}</div>
  )
}

export default Btn