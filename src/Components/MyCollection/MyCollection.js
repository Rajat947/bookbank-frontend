import React,{useEffect,useState} from 'react'
import Feed from '../Feed/Feed'
import logo from '../../Img/logo_black.png'
import './MyCollection.css'


const url_path = "https://gentle-forest-68636.herokuapp.com/api/";

function MyCollection() {
  const [list,setList] = useState([]);
  const [update,setUpdate] = useState(0);

  useEffect(()=>{
      fetch(url_path+"issues/student?token="+localStorage.getItem('token'))
      .then(res=>res.json())
      .then(res=>{
          setList(res.data);
      })
      .catch(err=>{
        setList([]);
      });
  },[update]);

  let returnBook = (item)=>{
    fetch(url_path+"issues/student/return/"+item.slug+"?token="+localStorage.getItem('token'),{
      method: 'POST',
      headers:{
          "Content-Type":"application/json"
      }
  })
  .then(res=>{
    setUpdate(update+1);
  })
  }
  let add = (item)=>{
    return <Feed key={item._id} title={item.name} author={item.author} year={item.yop} set={returnBook} book={item} text="Return Book" classes="col-3 Red-Btn"></Feed>
  }
  let updateFeed = (books)=>{
    if(books == null) return <h2>You haven't issued any book yet!!!</h2>
    return books.map(add);
  }
  return (
    <div className="container-fluid Home">
      <div className="row justify-content-between Header">
            <div className="col-2">
                <img src={logo} className="Logo" alt="Book Bank"></img>
            </div>
        </div>
      <div className="row" id="mycollection">
        My Collection :
      </div>
      <div className="row justify-content-start">
          {
            updateFeed(list)
          }
      </div>
    </div>
  )
}

export default MyCollection