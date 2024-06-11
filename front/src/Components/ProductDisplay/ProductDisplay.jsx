import React, { useContext } from "react";
import "./ProductDisplay.css"

import star_icon from "../Assets/star_icon.png"
import star_dull_icon from "../Assets/star_dull_icon.png"
import { ShopContext } from "../../Context/ShopContext";
function ProductDisplay(props) {
    const { product } = props
    const {addToCart} = useContext(ShopContext)
    return (
        <div className="productDisplay">
            <div className="productDisplay-left">
                <div className="productDisplay-img-list">
                    <img src={`http://localhost:3001/images/${product.image}`} alt="" />
                    <img src={`http://localhost:3001/images/${product.image}`} alt="" />
                    <img src={`http://localhost:3001/images/${product.image}`} alt="" />
                    <img src={`http://localhost:3001/images/${product.image}`} alt="" />
                </div>
                <div className="productDisplay-img">
                    <img className="productDisplay-main-img" src={`http://localhost:3001/images/${product.image}`} alt="" />
                </div>
            </div>
            <div className="productDisplay-right">
                <h1>{product.name}</h1>
                <div className="productDisplay-right-star">
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_dull_icon} alt="" />
                    <img src={star_dull_icon} alt="" />
                    <p>(150)</p>
                </div>
                <div className="productDisplay-right-prices">
                    <div className="productDisplay-right-price-old">${product.old_price}</div>
                    <div className="productDisplay-right-price-new">${product.new_price}</div>
                </div>
                <div className="productDisplay-right-description">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore incidunt voluptatum laudantium quibusdam? Eius unde voluptatem minus inventore! Eum facilis, vel quas eligendi illo nostrum cum sit quasi obcaecati totam est harum nobis sequi sapiente sed! Nam cumque beatae veritatis eius, earum tempora, assumenda eos, magnam odit delectus quis odio.
                </div>
                <div className="productDisplay-right-sizes">
                    <h1>Select Size</h1>
                    <div className="productDisplay-right-size">
                        <div>S</div>
                        <div>M</div>
                        <div>L</div>
                        <div>XL</div>
                        <div>XXL</div>
                    </div>
                </div>
                <button onClick={()=>{addToCart(product.id)}}>ADD TO CART</button>
                <p className="productDisplay-right-category"><span>Category :</span>Women , T-Shirt, Crop Top</p>
                <p className="productDisplay-right-category"><span>Tags :</span>Modern, Latest</p>
            </div>
        </div>
    )
}

export default ProductDisplay