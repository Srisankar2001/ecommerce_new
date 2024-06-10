import React, { useState } from "react";
import "./AddProduct.css"
import upload_area from "../../assets/upload_area.svg"
import axios from "axios"
function AddProduct() {
    const [detail,setDetail] = useState({
        name:"",
        image:"",
        category:"women",
        new_price:"",
        old_price:""
    })
    const changeHandler = (e) => {
        if(e.target.name === "image"){
            setDetail(prev=>({
                ...prev,
                image:e.target.files[0]
            }))
        }else{
            setDetail(prev=>({
                ...prev,
                [e.target.name]:e.target.value
            }))
        }
    }

    const addProduct = async() => {
        if (Object.values(detail).every(ele => ele !== "")){
            try{
                const config = {
                    headers: {
                      'content-type': 'multipart/form-data',
                    },
                  };
                  const formData = new FormData();
                  formData.append("name", detail.name);
                  formData.append("image", detail.image);
                  formData.append("category", detail.category);
                  formData.append("new_price", detail.new_price);
                  formData.append("old_price", detail.old_price);
                const response = await axios.post("http://localhost:3001/addproduct",formData,config)
                if(response.data.success){
                    alert("Product Added Successfully")
                }else{
                    alert("Product Added Fail")
                }
            }catch(error){
                alert("Product Added Fail")
            }
            
        }
    }
    return (
        <div className="addproduct">
            <div className="addproduct-itemfield">
                <p>Product title</p>
                <input value={detail.name} onChange={changeHandler} type="text" name="name" placeholder="Type here" />
            </div>
            <div className="addproduct-price">
                <div className="addproduct-itemfield">
                    <p>Price</p>
                    <input value={detail.old_price} onChange={changeHandler} type="text" name="old_price" placeholder="Type here" />
                </div>
                <div className="addproduct-itemfield">
                <p>Offer Price</p>
                <input value={detail.new_price} onChange={changeHandler} type="text" name="new_price" placeholder="Type here" />
            </div>
            </div>
            <div className="addproduct-itemfield">
                <p>Product category</p>
                <select value={detail.category} onChange={changeHandler} name="category" className="addproduct-selector">
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                    <option value="kid">Kid</option>
                </select>
            </div>
            <div className="addproduct-itemfield">
                <label htmlFor="file-input">
                    <img src={detail.image?URL.createObjectURL(detail.image):upload_area} alt="" className="addproduct-thumbnail-img"/>
                </label>
                <input onChange={changeHandler} type="file" name="image" id="file-input" hidden/>
            </div>
            <button onClick={addProduct} className="addproduct-btn">Add Product</button>
        </div>
    )
}

export default AddProduct