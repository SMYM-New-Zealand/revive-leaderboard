import React from "react";
import "./Card.css"

function Card({ rank, name, city, pts }) {
  return (
    <div className="card">
      <div className="rank">
        <h2>{rank}</h2>
      </div>
      <div className="details">
        <p className="name">{name}</p>
        <p className="city">{city}</p>
      </div>
      <div className="pts">
        <p>{pts} pts</p>
      </div>
    </div>
  );
}

export default Card;