import React from "react";
import './menu-item.styles.scss'

export const MenuItem = ({title,id,imageUrl,size}) =>{
    return(
        <div className={`${size} menu-item`}>
            <div style={{
                backgroundImage:`url(${imageUrl})`,
                backgroundPosition:'center',
                backgroundSize:'cover',
            }} className='background-image'>
                
            </div>
            <div className="content">
                <h1 className="title">{title}</h1>
                <span className="subtitle">SHOP NOW</span>
            </div>
        
        </div>
    )
}