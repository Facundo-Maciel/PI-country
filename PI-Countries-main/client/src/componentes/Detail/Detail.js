import React from "react"
import {GetCountryById} from "../../Redux/actions/index"
import { useParams } from "react-router";
import { useDispatch  , useSelector} from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../Detail/Detail.Module.css"

export default function Detail(props) {
    const{id} = useParams()

    const dispatch = useDispatch() 

    useEffect (() => {
      dispatch(GetCountryById(id))
    //   return ()=>{
    //       dispatch(cleandetail())
    //   }
    } ,[]) 

    const detailsstate = useSelector((state) => state.details)

    console.log('estos son los detalles',detailsstate);

    return(
        <div>

        {

            detailsstate.length > 0 ? 
                
            <div className={styles.dt}> 
                <Link to='/home'><button className={styles.btn}>Back Home</button></Link>

                <h1 className={styles.name}> {detailsstate[0].name|| "not found"} </h1>
                <img className={styles.imga} src={detailsstate[0].flag? detailsstate[0].flag :"https://media.tenor.com/Gz_ul33ZaAUAAAAd/amirlotan-animaniacs.gif"}/>     
                <h2 className={styles.type}>continents: {detailsstate[0].continents|| "not found"}</h2>
                <h2 className={styles.type}>capital: {detailsstate[0].capital|| "not found"}</h2>
                <h2 className={styles.type}>subregion: {detailsstate[0].subregion|| "not found"}</h2>
                <h2 className={styles.type}>area: {detailsstate[0].area|| "not found"}</h2> 
                <h2 className={styles.type}>population: {detailsstate[0].population|| "not found"}</h2>
                {/* <h2 className={styles.activities}>activities name: {detailsstate[0].activities ||  "not found"}</h2> */}
                {/* <h3 className={styles.activities}>duration: {detailsstate[0].activities[0].duration||  "not found"}</h3>
                <h3 className={styles.activities}>season : {detailsstate[0].activities[0].season||  "not found"}</h3>
                <h3 className={styles.activities}>difficulty : {detailsstate[0].activities[0].difficulty||  "not found"}</h3> */}
                <h3>Activities</h3>
                <div>
                {

                    detailsstate[0].hasOwnProperty('activities') ? detailsstate[0].activities.map(a =>{
                        id++
                        return(
                            <div  key={id}>
                                
                            <h2>ACTIVITY:{a.name}</h2>
                            <h2>DIFFICULTY: {a.difficulty}</h2>
                            <h2>DURATION: {a.duration}</h2>
                            <h2>SEASON: {a.season}</h2>

                            </div>
                        )
                    })
                    :<div> <h2> CAN NOT FIND ACTVITIES </h2></div>
                }
                 </div>
            </div>
                
                : 
            <div  className={styles.img}  >
            
                <img src="http://assets.materialup.com/uploads/5675f7a6-6bfb-4a5f-96fa-8fd68c7fec2d/gooey_effect-spinner-loader.gif"/>

            </div>
        }

        </div>
    )


}
