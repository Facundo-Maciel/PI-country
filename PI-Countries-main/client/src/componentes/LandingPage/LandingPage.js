import React from "react";
import Style from "../LandingPage/LandingPage.Module.css"
import { Link } from "react-router-dom"; //maneja todas las rutas de la aplicacion


export default function ReturnLandingPage(){

    return(
        <div>
            <h1 className={Style.title}> PI COUNTRIES </h1>
            <Link to="/home"><button className={Style.button}>Enter</button></Link>
             <p className={Style.parrafo}> Page of countries and tourist activities </p>
        </div>
    )

}