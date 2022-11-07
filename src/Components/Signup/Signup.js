import React,{useState, createRef,useEffect} from 'react'
import './Signup.css'
import logo from '../../Img/logo_black.png'
import LoginIcon from '@mui/icons-material/Login';
import { Link,useNavigate } from 'react-router-dom';

const url_path = "https://gentle-forest-68636.herokuapp.com/api/";

function Signup() {

    const navigate = useNavigate();
    useEffect(()=>{
        let user = localStorage.getItem('token');
        if(user!=null)
        {
            navigate('/Home');
        }
    })


    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const errorRef = createRef();
    const errorRef2 = createRef();

    let check = ()=>{
        if(name === '' || email === '' || password === '' || confirmPassword === ''){
            errorRef.current.style.display = "block";
            return true;
        }
        if(password !== confirmPassword)
        {
            errorRef2.current.style.display = "block";
            return true;
        }
        return false;
    }

    let submit = (event)=>{
        if(check()) return;
        console.log("clicked");
        fetch(url_path+"users/signup",{
            method: 'POST',
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                'name': name,
                'email': email,
                'password': password,
                'passwordConfirm': confirmPassword,
                'admin': false
            })
        }).then(res=>{
            return res.json();
        }).then(res=>{
            localStorage.setItem("token",res.token);
            localStorage.setItem("isAdmin",res.isAdmin);
            window.location.reload();
        }).catch(err=>{
            console.log(err);
        })
    };
    let change = (event)=>{
        errorRef.current.style.display = "none";
        errorRef2.current.style.display = "none";
        let id = event.target.id;
        switch(id){
            case "name":{
                setName(event.target.value);
                break;
            }
            case "email":{
                setEmail(event.target.value);
                break;
            }
            case "password":{
                setPassword(event.target.value);
                break;
            }
            case "confirmPassword":{
                setConfirmPassword(event.target.value);
                break;
            }
        }
    }
  return (
    <div className="container-fluid Home">
        <div className="row justify-content-between Header">
            <div className="col-2">
                <img src={logo} className="Logo" alt="Book Bank"></img>
            </div>
            <div className="col-2 right">
                <Link to="/signin">
                    <LoginIcon fontSize="large" sx={{color:'black'}}></LoginIcon>
                </Link>
            </div>
        </div>
        <div className="row signup-form-wrapper center">
            <div id="Header">Register</div>
            <div className="error" ref={errorRef}>*Please fill all of given fields*</div>
            <div className="error" ref={errorRef2}>*Password and confirmed password do not match*</div>
            <div className="signup-wrapper left">
                <label className="Label">Name: </label>
                <input className="input-field" type="text" value={name} onChange={change} id="name"/>
            </div>
            <div className="signup-wrapper left">
                <label className="Label">Email: </label>
                <input className="input-field"  type="email"value={email} onChange={change} id="email"/>
            </div>
            <div className="signup-wrapper left">
                <label className="Label">Password: </label>
                <input className="input-field"  type="password"value={password} onChange={change} id="password"/>
            </div>
            <div className="signup-wrapper left">
                <label className="Label">Confirm Password: </label>
                <input className="input-field"  type="password" value={confirmPassword} onChange={change} id="confirmPassword"/>
            </div>
            <button className="submit-btn" onClick={submit}>Submit</button>
        </div>
    </div>
  )
}

export default Signup