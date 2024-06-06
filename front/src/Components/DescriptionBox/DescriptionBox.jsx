import React from "react";
import "./DescriptionBox.css"
function DescriptionBox(){
    return(
        <div className="descriptionBox">
            <div className="descriptionBox-navigator">
                <div className="descriptionBox-nav-box">
                    Description
                </div>
                <div className="descriptionBox-nav-box fade">
                    Reviews (150)
                </div>
            </div>
            <div className="descriptionBox-description">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, id voluptates, asperiores quia cumque reiciendis debitis neque vel velit incidunt voluptatibus! Assumenda vitae est corrupti illo, consequuntur nesciunt doloremque, quidem neque autem deserunt voluptatum labore dignissimos cupiditate! Maiores, eos consectetur dignissimos voluptate repudiandae ipsum pariatur aspernatur neque totam provident. Corporis.</p>
            </div>
        </div>
    )
}

export default DescriptionBox