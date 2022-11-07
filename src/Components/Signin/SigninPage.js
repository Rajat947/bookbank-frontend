import React,{useEffect} from "react";
import { useNavigate } from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Signin.css';
import logo from "../../Img/logo_black.png"
import Form from '../Form/LoginForm'

function SignIn() {
    const navigate = useNavigate();
    useEffect(()=>{
        let user = localStorage.getItem('token');
        if(user!=null)
        {
            navigate('/Home');
        }
    })
    
    return (
        <div className="SignIn container-fluid">
            <div className="row">
                <div className="col-6 Illustration "></div>
                <div className="col-6 signInForm">
                    <div className="container-fluid Form">
                        <div className="row justify-content-center">
                            <img src={logo} alt="logo"></img>
                        </div>
                        <div className="row">
                            <Form></Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
  
  export default SignIn;