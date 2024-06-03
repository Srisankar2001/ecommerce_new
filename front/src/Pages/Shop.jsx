import React from "react";
import Hero from "../Components/Hero/Hero.jsx";
import Popular from "../Components/Popular/Popular.jsx";
import Offer from "../Components/Offer/Offer.jsx";

function Shop(){
    return(
        <div>
            <Hero/>
            <Popular/>
            <Offer/>
        </div>
    )
}

export default Shop