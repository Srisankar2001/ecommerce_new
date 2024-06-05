import React from "react";
import "./Footer.css"

import footer_logo from "../Assets/logo_big.png"
import instagram from "../Assets/instagram_icon.png"
import pintester from "../Assets/pintester_icon.png"
import whatsapp from "../Assets/whatsapp_icon.png"
function Footer(){
    return(
        <div className="footer">
            <div className="footer-logo">
                <img src={footer_logo} alt="footer"/>
                <p>SHOPPY</p>
            </div>
            <ul className="footer-link">
                <li>Company</li>
                <li>Products</li>
                <li>Offices</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
            <div className="footer-social-icon">
                <div className="footer-icon-container">
                    <img src={instagram} alt="instagram"/>
                </div>
                <div className="footer-icon-container">
                    <img src={pintester} alt="pintester"/>
                </div>
                <div className="footer-icon-container">
                    <img src={whatsapp} alt="whatsapp"/>
                </div>
            </div>
            <div className="footer-copyright">
                <hr/>
                <p>Copyright @ 2024 - All Rights Reserved.</p>
            </div>
        </div>
    )
}

export default Footer