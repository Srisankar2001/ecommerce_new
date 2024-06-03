import React, { useState } from "react";
import "./Navbar.css"

import logo from "../Assets/logo.png"
import cart from "../Assets/cart_icon.png"
import { Link } from "react-router-dom";

function Navbar() {
    const [menu, setMenu] = useState("shop")
    return (
        <div className="navbar">
            <div className="navbar-logo">
                <img src={logo} alt="Logo" />
                <p>SHOPPY</p>
            </div>
            <ul className="navbar-menu">
                <li onClick={() => { setMenu("shop") }}><Link to="/">Shop{menu === "shop" ? <hr /> : <></>}</Link></li>
                <li onClick={() => { setMenu("men") }}><Link to="/men">Men{menu === "men" ? <hr /> : <></>}</Link></li>
                <li onClick={() => { setMenu("women") }}><Link to="/women">Women{menu === "women" ? <hr /> : <></>}</Link></li>
                <li onClick={() => { setMenu("kid") }}><Link to="/kid">Kid{menu === "kid" ? <hr /> : <></>}</Link></li>
            </ul>
            <div className="navbar-login-cart">
                <button><Link to="/login">Login</Link></button>
                <Link to="/cart"><img src={cart} alt="Cart" /></Link>
                <div className="navbar-count">0</div>
            </div>
        </div>
    )
}

export default Navbar;