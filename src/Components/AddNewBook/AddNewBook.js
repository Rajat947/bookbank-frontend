import React,{useState, useRef, useEffect} from 'react'
import '../Signup/Signup.css'
import logo from '../../Img/logo_black.png'
import './AddNewBook.css'
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router";

const url_path = "https://gentle-forest-68636.herokuapp.com/api/";

function AddNewBook() {

    const nav = useNavigate();
    let valid = ()=>{
        if(localStorage.getItem('token') == null) nav("/");
    }

    const [title,setTitle] = useState('');
    const [author,setAuthor] = useState('');
    const [year,setYear] = useState('');
    const [number,setNumber] = useState(0);

    const errorRef = useRef();
    const successRef = useRef();

    useEffect(()=>{
        valid();
    },[])

    let check = ()=>{
        if(title === '' || author === '' || year === '' || number===0){
            errorRef.current.style.display = "block";
            return false;
        }
        return true;
    }

    let submit = (event)=>{
      let temp = check();
        if(temp===true){
            fetch(url_path+"books"+"?token="+localStorage.getItem('token'),{
                method:'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({
                    'name': title,
                    'author': author,
                    'copies': number,
                    'yop' : year
                }) 
            }).then(res=>{
                successRef.current.style.display = "block";
            }).catch(err=>{
                console.log(err);
            })
          console.log(title);
          console.log(author);
          console.log(year);
          console.log(number);
        }
        
    };
    let change = (event)=>{
        errorRef.current.style.display = "none";
        successRef.current.style.display = "none";
        let id = event.target.id;
        switch(id){
            case "title":{
                setTitle(event.target.value);
                break;
            }
            case "author":{
                setAuthor(event.target.value);
                break;
            }
            case "year":{
                setYear(event.target.value);
                break;
            }
            case "number":{
              setNumber(Number(event.target.value));
              break;
            }
        }
    }
    let logout = ()=>{
        localStorage.clear();
        window.location.reload();
    }
  return (
    <div className="container-fluid Home">
        <div className="row justify-content-between Header">
            <div className="col-2">
                <img src={logo} className="Logo" alt="Book Bank"></img>
            </div>
            <div className="col-1 right">
                <button className="none" onClick={logout}>
                    <LogoutIcon fontSize="large" sx={{color:'black'}}></LogoutIcon>
                </button>
            </div>
        </div>
        <div className="row signup-form-wrapper center">
            <div id="Header">Add a new book</div>
            <div className="error" ref={errorRef}>*Please fill all of given fields*</div>
            <div className="error green" ref={successRef}>Book is added successfully</div>
            <div className="signup-wrapper left">
                <label className="Label">Title: </label>
                <input className="input-field" type="text" value={title} onChange={change} id="title"/>
            </div>
            <div className="signup-wrapper left">
                <label className="Label">Author: </label>
                <input className="input-field"  type="text"value={author} onChange={change} id="author"/>
            </div>
            <div className="signup-wrapper left">
                <label className="Label">Year: </label>
                <input className="input-field"  type="text" value={year} onChange={change} id="year"/>
            </div>
            <div className="signup-wrapper left">
                <label className="Label">Number of Book: </label>
                <input className="input-field"  type="number" value={number} onChange={change} id="number" min={1}/>
            </div>
            <button className="submit-btn" onClick={submit}>Submit</button>
        </div>
    </div>
  )
}

export default AddNewBook