import React from "react";
import "./Card.css"

function Card(){
    return (
        <div className="card">
            <div className="rank">
                <h2>1</h2>
            </div>
            <div className="details">
                <p className="name">John Smith</p>
                <p className="city">Auckland</p>
            </div>
            <div className="pts">
                <p>100 pts</p>
            </div>
        </div>
    );
}

export default Card;