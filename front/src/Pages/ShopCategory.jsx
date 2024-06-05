import React, { useContext } from "react";
import "./Style/ShopCategory.css"
import { ShopContext } from "../Context/ShopContext";

import dropdown from "../Components/Assets/dropdown_icon.png"
import Item from "../Components/Item/Item";
function ShopCategory(props) {
    const { all_product } = useContext(ShopContext)
    return (
        <div className="shopCategory">
            <img className="shopCategory-banner" src={props.banner} alt="" />
            <div className="shopCategory-indexSort">
                <p>
                    <span>Showing 1-12</span> out of 36 products
                </p>
                <div className="shopCategory-sort">
                    Sort by <img src={dropdown} alt="" />
                </div>
            </div>
            <div className="shopCategory-product">
                {all_product.map((item, index) => {
                    if (props.category === item.category) {
                        return <Item key={index} id={item.id} name={item.name} image={item.image} old_price={item.old_price} new_price={item.new_price} />
                    } else {
                        return null
                    }
                })}
            </div>
            <div className="shopCategory-loadmore">
                Explore More
            </div>
        </div>
    )
}

export default ShopCategory;