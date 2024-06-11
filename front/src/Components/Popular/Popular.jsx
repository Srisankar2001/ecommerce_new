import React from "react";
import "./Popular.css"
import data_product from "../Assets/data"
import Item from "../Item/Item";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios"
function Popular(){
    const [data,setData] = useState([])
    useEffect(async()=>{
        try{
            const response = await axios.get("http://localhost:3001/popularinwomen")
            setData(response.data)
        }catch(error){
            alert("Error")
        }
    },[])
    return (
        <div className="popular">
            <h1>POPULAR IN WOMEN</h1>
            <hr/>
            <div className="popular-item">
                {data.map((item,index)=>{
                    return <Item key={index} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
                })}
            </div>
        </div>
    )
}

export default Popular