import React from "react";
import {Link} from "react-router-dom";
import Style from "../NavBar/NavBar.Module.css";

//importamos componentes
import SearchBar from "../SearchBar/SearchBar";


export default function ReturnNavBar(){

    return(
        <div className={Style.divEstile}>

        
                <h1 >  <Link to= "/" className={Style.tituloEstile}>  Countries   </Link> </h1>
               
          
            <SearchBar/>
            
        </div>
    )


}