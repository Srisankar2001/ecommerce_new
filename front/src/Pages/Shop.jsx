import React from "react";
import Hero from "../Components/Hero/Hero.jsx";
import Popular from "../Components/Popular/Popular.jsx";
import Offer from "../Components/Offer/Offer.jsx";
import NewCollection from "../Components/NewCollection/NewCollection.jsx";
import NewsLetter from "../Components/NewsLetter/NewsLetter.jsx";

function Shop(){
    return(
        <div>
            <Hero/>
            <Popular/>
            <Offer/>
            <NewCollection/>
            <NewsLetter/>
        </div>
    )
}

export default Shop