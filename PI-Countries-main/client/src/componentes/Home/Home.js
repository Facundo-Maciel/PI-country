import React from 'react';
import {Link} from "react-router-dom";
import {useEffect , useState} from 'react';
import {useDispatch , useSelector} from 'react-redux';
import Styles from "../Home/Home.Module.css"

import {GetCountry, FilterContinents , TidyAlphabetically, TidyPopulation, FilterFerActivities,  GetActivities } from "../../Redux/actions/index";

//importamos componentes
import ReturnNavBar from "../NavBar/NavBar";
import Cards from "../Cards/Cards";
import Paginado from '../paginado/paginado';


export default function ReturnHome(){


    const dispatch = useDispatch()
    const[order,setOrder] =useState('') 
    
    const allCountries = useSelector((state)=> state.Countries)
    const allActivities = useSelector((state)=> state.Activities)
    
    const[currentPage,setCurrentPage] =useState(1) 
    const[CountriesPerPage,]=useState(9) 
    
    const [setRender] = useState("");
    const indexLastCountry = currentPage *  CountriesPerPage 
    
    const indexFirstCountry = indexLastCountry - CountriesPerPage

    const currentCountries= allCountries.slice(indexFirstCountry,indexLastCountry)
    
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
     }

    useEffect(()=> {
        dispatch(GetCountry())
        dispatch(GetActivities())
    }, [dispatch])

    //Handlers

    function HandlerFilterTypeContinents(e){
        e.preventDefault();
        dispatch(FilterContinents(e.target.value))
        setCurrentPage(1);
        setOrder(`ordenado ${e.target.value}`)
    }

    function HandlerFilterTypeFerDifficulty(e){
        // e.preventDefault();
        dispatch(FilterFerActivities(e.target.value))
        setCurrentPage(1);
         setOrder(`ordenado ${e.target.value}`)
    }

    function handleFilterTidy (e) {
        dispatch(TidyAlphabetically(e.target.value))
        setCurrentPage(1);
        setOrder(`ordenado ${e.target.value}`)
        
    }

    function handleFilterTidyPopulation(e) {
        e.preventDefault();
        dispatch(TidyPopulation(e.target.value))
        setCurrentPage(1);
        setOrder(`ordenado ${e.target.value}`)
    
    }



    return(

        <div>

            <ReturnNavBar/>
            <Paginado 
            CountriesPerPage = {CountriesPerPage}
            allCountries = {allCountries.length}
            paginado = {paginado}
            />


            <div className={Styles.ContenedorBarra}>

                <div >
                <select onChange={e => HandlerFilterTypeContinents(e)} className = {Styles.TypeDiets} >
                        <option value="all"> TypesContinent </option>
                        <option value="Americas">Americas</option>
                        <option value="Antarctic">Antarctic</option>
                        <option value="Asia">Asia</option>
                        <option value="Africa">Africa</option>
                        <option value="Europe">Europe</option>
                        <option value="Oceania">Oceania</option>
                </select>
                </div>

                <div >
                <select onChange={e => HandlerFilterTypeFerDifficulty(e)} className = {Styles.TypeDiets} >
                        <option value = "all"> all Activities </option>
                        {allActivities.map((t)=> (
                             <option value = {t.name}> {t.name} </option>
                        ))}
                </select>
                </div>

                <div>
                <select onChange={e => handleFilterTidy(e)} className = {Styles.TypeDiets}>
                        <option selected hidden>Alphabetic</option>
                        <option value="asc"> A to Z </option>
                        <option value="descendente">Z to A</option>
                </select>
                </div>

                <div>
                <select onChange={e => handleFilterTidyPopulation(e)} className = {Styles.TypeDiets}>
                        <option selected hidden>population</option>
                        <option value="min"> Minor to Major Score </option>
                        <option value="Maximo">Major to Minor Score</option>
                </select>
                </div>

                <div>
                <Link to="/activity"><button className={Styles.TypeDiets}>CreateActivity</button></Link>
                </div>

            </div>

 
             <div className={Styles.CardArea}>{
                currentCountries?currentCountries.map(info=>{
                    return(

                        <Link to ={"/country/" +info.id}>
                            <Cards  key={info.id} name={info.name} flag={info.flag} continents={info.continents} />
                        </Link>
                        
                        
                    )
                })
                :
                 <div>
                        <h1> ERROR!</h1>
                </div>
                
                }
           
            </div> 
         
        </div>
    )

}