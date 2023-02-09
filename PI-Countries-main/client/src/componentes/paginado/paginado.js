import React from "react";
import { useState } from "react";
import Style from "../paginado/paginado.Module.css"


// funcion con la creacion de paginado  ← Prev pageNumbers Next → usando states........
export default function Paginado ({CountriesPerPage , allCountries ,paginado}) {
    const pageNumbers = []
    const [pageNum, SetPageNum] = useState(1)
        for (let i = 0 ; i < Math.ceil(allCountries/CountriesPerPage) ; i++){
                    pageNumbers.push(i+1)
         }
    return (

       <div>
           <ul className= {Style.div}>
                <li>
                   <p className= {Style.button} onClick={() => {if(pageNum > 1) paginado(pageNum - 1); if(pageNum > 1)SetPageNum(pageNum - 1)}}>
                   ⪻
                   </p>
                </li>
                {pageNumbers && pageNumbers.map(number =>(
                    <li>
                        <p  onClick={() => {paginado(number); SetPageNum(number)} } className={pageNum === number ? Style.active : pageNum === number+1 || pageNum === number-1 ? Style.side : Style.inactive}>{number}</p>
                    </li>
                ))}
                <li>
                    <p className= {Style.button} onClick={() => {if(pageNum < pageNumbers.length) paginado(pageNum + 1); if(pageNum < pageNumbers.length) SetPageNum(pageNum + 1)}}>
                    ⪼
                    </p>
                </li>
            </ul>
       </div>

    )
}
﻿
