import React from "react";
import "./Style/LoginSignup.css"
import { useState } from "react";
import axios from "axios"
function LoginSignup() {
    const [state, setState] = useState("Signup")

    const [data,setData] = useState({
        name:"",
        email:"",
        password:"",
    })

    const login = async () => {
        if(data.email.trim !== "" && data.password.trim !== "")
        try{
            const response = await axios.post("http://localhost:3001/login",data)
            if(response.data.success){
                localStorage.setItem("token",response.data.token)
                window.location.replace("/")
            }else{
                alert(response.data.message)
            }
        }catch(error){
           console.log(error)
        }
    }

    const signup = async () => {
        if(data.name.trim !== "" && data.email.trim !== "" && data.password.trim !== "")
            try{
                const response = await axios.post("http://localhost:3001/signup",data)
                if(response.data.success){
                    localStorage.setItem("token",response.data.token)
                    window.location.replace("/")
                }else{
                    alert(response.data.message)
                }
            }catch(error){
               console.log(error)
            }
    }

    const handleChange = (e) => {
        setData(prev=>({
            ...prev,
            [e.target.name]:e.target.value
        }))
    }
    return (
        <div className="loginSignup">
            <div className="loginSignup-container">
                <h1>{state}</h1>
                <div className="loginSignup-fields">
                    {state === "Signup" ? <input type="text" placeholder="Your name" name="name" value={data.name} onChange={handleChange}/> : <></>}
                    <input type="email" placeholder="Your email" name="email" value={data.email} onChange={handleChange}/>
                    <input type="password" placeholder="Your password"  name="password" value={data.password} onChange={handleChange}/>
                </div>
                <button onClick={state==="Signup"? signup : login}>Countinue</button>
                {state === "Signup" ?
                    <p className="loginSignup-login">Already have an account? <span onClick={() => {setState("Login")}}>Login Here</span></p>
                    :
                    <p className="loginSignup-login">Don't have an account? <span onClick={() => {setState("Signup")}}>Click Here</span></p>
                }
                {state === "Signup" ? <div className="loginSignup-agree">
                    <input type="checkbox" name="" id="" />
                    <p>By continuing, i agree to the terms of use & privacy policy</p>
                </div>
                    : <></>
                }
            </div>
        </div>
    )
}

export default LoginSignup;