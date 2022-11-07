import React, {useState,useEffect,useRef} from 'react'
import './Form.css';


const url_path = "https://gentle-forest-68636.herokuapp.com/api/";

function Form(){
    const [email,emailUpdate] = useState('');
    const [password,passwordUpdate] = useState('');
    const errorRef = useRef();
    const submitRef = useRef();
    useEffect(()=>{
        if(email !== "" && password !== "")
        {
            submitRef.current.classList.remove("disabled");
            submitRef.current.classList.add("effect");
        }
        else if(submitRef.current.classList.contains("disabled") === false){
            submitRef.current.classList.add("disabled");
            submitRef.current.classList.remove("effect");
        }
    },[email,password]);
    function changed(event){
        let element = event.target.className;
        switch(element)
        {
            case "email":
            {
                emailUpdate(event.target.value)
                break;
            }
            case "password":
            {
                passwordUpdate(event.target.value)
                break;
            }
            default: break;
        }
        // console.log(`email: ${email} and password: ${password}`);
        errorRef.current.style.display = "none";
    }
    function submit(event){
        event.preventDefault();

        fetch(url_path+"users/login",{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                'email': email,
                'password': password
            }) 
        })
        .then(res=>res.json())
        .then(data=>{
            localStorage.setItem('token',data.token);
            localStorage.setItem('isAdmin',data.isAdmin);
            window.location.reload();
        });
    }
    return(
        <form id="login-form">
            <div className="error" ref={errorRef}>*Email or Password is incorrect. Try Again*</div>
            <div>
                <label>Email - Id  </label>
                <input className="email" type="text" value={email} onChange={changed}></input>
            </div>
            <div>
                <label>Password </label>
                <input className="password"  type="password" value={password} onChange={changed}></input>
            </div>
            <button className="submit-button disabled" onClick={submit} ref={submitRef}>LOGIN</button>
        </form>
    )

}

export default Form;