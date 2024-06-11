import React, { createContext, useState } from "react";
import { useEffect } from "react";
import axios from "axios"

export const ShopContext = createContext(null)

const getDefaultCart = () => {
    let cart = {}
    for(let index = 0; index< 300+1; index++){
        cart[index] = 0;
    }
    return cart
}

const ShopContextProvider = (props) => {
    const [all_product,setAllProduct] = useState([])
    const [cartItems,setCartItems] = useState(getDefaultCart())
    
    useEffect(async()=>{
        const response = await axios.get("http://localhost:3001/allproducts")
        setAllProduct(response.data)

        if(localStorage.getItem("token")){
            try{
                const config = {
                    headers : {
                        token: localStorage.getItem("token")
                    }
                }
                const response = await axios.post("http://localhost:3001/getcart",{},config)
                setCartItems(response.data)
            }catch(error){
                alert("Error connect to server")
            }
        }
    },[])

    const addToCart = async(itemId) => {
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        if(localStorage.getItem("token")){
            try{
                const config = {
                    headers : {
                        token: localStorage.getItem("token")
                    }
                }
                const response = await axios.post("http://localhost:3001/addtocart",{itemId:itemId},config)
                if(response.data){
                    alert(response.data.message)
                }
            }catch(error){
                alert("Error connect to server")
            }
        }
    }

    const removeFromCart = async(itemId) => {
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(localStorage.getItem("token")){
            try{
                const config = {
                    headers : {
                        token: localStorage.getItem("token")
                    }
                }
                const response = await axios.post("http://localhost:3001/removefromcart",{itemId:itemId},config)
                if(response.data){
                    alert(response.data.message)
                }
            }catch(error){
                alert("Error connect to server")
            }
        }
    }

    const getTotalCartAmount = () => {
        let total = 0;
        for(const item in cartItems){
            if(cartItems[item] > 0 ){
                let itemInfo = all_product.find((product)=>product.id === Number(item))
                total += itemInfo.new_price * cartItems[item]
            }
        }
        return total
    }

    const getTotalCartItem = () => {
        let total = 0;
        for(const item in cartItems){
            if(cartItems[item] > 0 ){
               total += cartItems[item]
            }
        }
        return total
    }
    const contextValue = {getTotalCartItem,all_product,getTotalCartAmount,cartItems,addToCart,removeFromCart}

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider