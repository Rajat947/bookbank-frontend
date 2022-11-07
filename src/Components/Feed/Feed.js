import React from 'react'
import './Feed.css'
import Btn from '../Button/Button'
import thumbnail from '../../Img/img.webp'

function Feed(props) {
  let change = ()=>{
    props.set(props.book)
  }
  return (
    <div className="wrapper">
      <div className="Thumbnail"></div>
      <div className="Feed">
          <div className="Title">{props.title}</div>
          <div className="Author"><i>Author: </i>{props.author}</div>
          <div className="Year"><i>Published in: </i>{props.year}</div>
          <div className="row justify-content-end">
            <Btn change={change} classes={props.classes} text={props.text}></Btn>
          </div>
      </div>
    </div>
  )
}

export default Feed