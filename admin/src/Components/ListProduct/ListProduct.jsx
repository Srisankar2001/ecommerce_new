import React, { useEffect, useState } from 'react'
import "./ListProduct.css"
import axios from 'axios'
import cross_icon from "../../assets/cross_icon.png"
function ListProduct() {
    const [data, setData] = useState([])
    const fetchProduct = async () => {
        try {
            const response = await axios.get("http://localhost:3001/allproducts")
            setData(response.data)
        } catch (error) {
            alert("Error")
        }
    }

    useEffect(() => {
        fetchProduct()
    }, [])

    const removeProduct = async (id) => {
        try {
            const response = await axios.post("http://localhost:3001/removeproduct", { id: id })
            if (response.data.success) {
                alert("Product Deleted Successfully")
                await fetchProduct()
            } else {
                alert("Product Delete Fail")
            }
        } catch (error) {
            alert("Product Delete Fail")
        }
    }

    return (
        <div className="listproduct">
            <h1>All Products List</h1>
            <div className="listproduct-format-main">
                <p>Product</p>
                <p>Title</p>
                <p>Old Price</p>
                <p>New Price</p>
                <p>Category</p>
                <p>Remove</p>
            </div>
            <div className="listproduct-allproduct">
                <hr />
                {data.map((product, index) => {
                    return (
                        <>
                            <div key={index} className='listproduct-format-main listproduct-format'>
                                <img src={`http://localhost:3001/images/${product.image}`} alt="" className='listproduct-product-icon' />
                                <p>{product.name}</p>
                                <p>${product.old_price}</p>
                                <p>${product.new_price}</p>
                                <p>{product.category}</p>
                                <img onClick={() => removeProduct(product.id)} src={cross_icon} alt="" className='listproduct-remove-icon' />
                            </div>
                            <hr />
                        </>
                    )
                })}
            </div>
        </div>
    )
}

export default ListProduct