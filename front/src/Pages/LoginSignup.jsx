import React from "react";
import "./Style/LoginSignup.css"

function LoginSignup(){
    return(
        <div className="loginSignup">
            <div className="loginSignup-container">
                <h1>Sign Up</h1>
                <div className="loginSignup-fields">
                    <input type="text" placeholder="Your name" />
                    <input type="email" placeholder="Your email" />
                    <input type="password" placeholder="Your password" />
                </div>
                <button>Countinue</button>
                <p className="loginSignup-login">Already have an account? <span>Login Here</span></p>
                <div className="loginSignup-agree">
                    <input type="checkbox" name="" id="" />
                    <p>By continuing, i agree to the terms of use & privacy policy</p>
                </div>
            </div>
        </div>
    )
}

export default LoginSignup;