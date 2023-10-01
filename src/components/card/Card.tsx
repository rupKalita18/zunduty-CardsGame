import React from 'react';
import  "./Card.css";


interface CardProps{
    index:number,
    image:string,
    isFlipped:boolean,
    onClick:(index:number)=>void;
}



const Card:React.FC<CardProps>=({index,image,isFlipped,onClick})=>{
    const handleClick=()=>{
        onClick(index);
    }
    return (
    <div className={`card ${isFlipped?' flipped':''}`} onClick={handleClick}>
        
        {isFlipped && <img src={image} alt={`Avatar ${index}`} />}
    </div>
    )
}


export default Card