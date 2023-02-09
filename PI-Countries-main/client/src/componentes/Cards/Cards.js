import React from "react";
import Style from "../Cards/Cards.Module.css"

export default function Cards({name, flag , continents}){

    return(
        <div className={Style.container}>
         <div className={Style.card}>
           <div className={Style.imgBx}>
             <img className={Style.img} src={flag}/>
             </div>
           <div className={Style.contentBx}>
             <div className={Style.content}>
                <h1>{name}</h1>
                <h2>continents: {`${continents}`}</h2>
             </div>
           </div>
          </div>
        </div>
    )


}