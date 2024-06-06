import React, { useContext, useRef, useState } from "react";
import "./Navbar.css"

import logo from "../Assets/logo.png"
import cart from "../Assets/cart_icon.png"
import nav_dropdown from "../Assets/nav_dropdown.png"
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";

function Navbar() {
    const {getTotalCartItem} = useContext(ShopContext)
    const [menu, setMenu] = useState("shop")
    const menuRef = useRef()

    const dropdown_toggle = (e) => {
        menuRef.current.classList.toggle('navbar-menu-visible');
        e.target.classList.toggle('open');
    }
    return (
        <div className="navbar">
            <div className="navbar-logo">
                <img src={logo} alt="Logo" />
                <p>SHOPPY</p>
            </div>
            <img className="navbar-dropdown" src={nav_dropdown} alt="" onClick={dropdown_toggle}/>
            <ul ref={menuRef} className="navbar-menu">
                <li onClick={() => { setMenu("shop") }}><Link to="/">Shop{menu === "shop" ? <hr /> : <></>}</Link></li>
                <li onClick={() => { setMenu("men") }}><Link to="/men">Men{menu === "men" ? <hr /> : <></>}</Link></li>
                <li onClick={() => { setMenu("women") }}><Link to="/women">Women{menu === "women" ? <hr /> : <></>}</Link></li>
                <li onClick={() => { setMenu("kid") }}><Link to="/kid">Kid{menu === "kid" ? <hr /> : <></>}</Link></li>
            </ul>
            <div className="navbar-login-cart">
                <button><Link to="/login">Login</Link></button>
                <Link to="/cart"><img src={cart} alt="Cart" /></Link>
                <div className="navbar-count">{getTotalCartItem()}</div>
            </div>
        </div>
    )
}

export default Navbar;