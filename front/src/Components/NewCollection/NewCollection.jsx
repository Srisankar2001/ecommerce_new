import React from "react";
import "./NewCollection.css"
import axios from "axios"

import Item from "../Item/Item";
import { useState } from "react";
import { useEffect } from "react";
function NewCollection(){
    const [data,setData] = useState([])
    useEffect(async()=>{
        try{
            const response = await axios.get("http://localhost:3001/newcollection")
            setData(response.data)
        }catch(error){
            alert("Error")
        }
    },[])
    return(
        <div className="newcollection">
            <h1>NEW COLLECTIONS</h1>
            <hr/>
            <div className="collection">
                {data.map((item,index)=>{
                    return <Item key={index} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
                })}
            </div>
        </div>
    )
}

export default NewCollection