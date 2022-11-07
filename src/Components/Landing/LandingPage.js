import React,{useEffect} from "react";
import { Link,useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Landing.css';
import logo from "../../Img/logo_white.png"
import manIll from "../../Img/manIll.svg"
import bubble from "../../Img/Bubble.svg"

function Landing() {
    const navigate = useNavigate();
    useEffect(()=>{
        let user = localStorage.getItem('bookbank');
        if(user!=null)
        {
            console.log(user);
            navigate('/Home');
        }
    })
    return (
        <div className="LandingPage ">
            <div className="main-container container-fluid">
                <div className="row">
                <div className="col-8 left-side container-fluid">
                    <div className="row">
                        <img className="logo" src={logo} alt="Book Bank"></img>
                    </div>
                    <div className="row">
                        <p className="main-text">Love reading books..?<br></br>You're in right place then!!<br></br>Sign up and get access to your favourite books anytime</p>
                    </div>
                    <div className="row proceed">
                        <Link className="startbutton" to="/signup">Sign Up</Link>
                        <div className="SignInButton">Already Registerd ? <Link to="/signin">Sign in</Link> </div>
                    </div>
                </div>
                <div className="col-4 right-side">
                    <img id="manill" src={manIll} alt="Illustration"></img>
                    <img id="bubble" src={bubble} alt="Illustration"></img>
                </div>
                </div>
            </div>
            <div className="footer">
                <ul>
                    <li><a href="/help">Help</a></li>
                    <li><a href="/Terms">Terms and Services</a></li>
                    <li><a href="/AboutUs">About-Us</a></li>
                    <li><a href="/Support">Support</a></li>
                    <li>&copy; BOOK BANK</li>
                </ul>
            </div>
        </div>
    );
  }
  
  export default Landing;