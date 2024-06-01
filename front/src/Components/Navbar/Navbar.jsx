import React, { useState } from "react";
import "./Navbar.css"

import logo from "../Assets/logo.png"
import cart from "../Assets/cart_icon.png"

function Navbar(){
    const [menu,setMenu] = useState("shop")
    return(
        <div className="navbar">
            <div className="navbar-logo">
                <img src={logo} alt="Logo"/>
                <p>SHOPPY</p>
            </div>
            <ul className="navbar-menu">
                <li onClick={()=>{setMenu("shop")}}>Shop{menu==="shop"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("men")}}>Men{menu==="men"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("women")}}>Women{menu==="women"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("kid")}}>Kid{menu==="kid"?<hr/>:<></>}</li>
            </ul>
            <div className="navbar-login-cart">
                <button>Login</button>
                <img src={cart} alt="Cart"/>
                <div className="navbar-count">0</div>
            </div>
        </div>
    )
}

export default Navbar;