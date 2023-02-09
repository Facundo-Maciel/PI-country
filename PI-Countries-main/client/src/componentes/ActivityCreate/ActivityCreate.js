import React from "react";
import { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import styles from "../ActivityCreate/ActivityCreate.Module.css"

//importamos aciciones
import {PostActivity , GetNamesCountries } from "../../Redux/actions/index"

function controlForm (input){
    const reg = new RegExp('^[0-9]+$');
    let errors = {}
    if(!input.name) errors.name = 'please put the name of the activity'
    if(!input.duration) errors.duration= 'please put the duration of the activity'
    if(!input.season) errors.season= 'please put the season of the activity'
    if(input.difficulty < 1 || input.difficulty> 5 || !reg.test(input.difficulty)) errors.difficulty='put a difficulty between 1-5'
    return errors
}

export default function CreateActivity(){

    const dispatch = useDispatch()
    let listNamesCountries = useSelector((state) => state.NamesCountries )
    console.log(' Esta actividad se hace en ',listNamesCountries);
    const [errors,setErrors]=useState({})      // este estado local es para, las validaciones(del formulario controlado)
    const [input,setInput] = useState({
        name:'',
        duration:'',
        difficulty:'',
        season:'',
        country:[],    
    })

    useEffect(() => {
        dispatch(GetNamesCountries())
    },[dispatch])

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(controlForm({
            ...input,
            [e.target.name] : e.target.value    // me copio todo lo que venga del formulario , en el caso de que en alguno
        }))                               // no cumpla con las validaciones, se va a poner un texto advirtiendo
    }

    function handleSelect(e){
        setInput({
            ...input,
            country:[...input.country, e.target.value]
           
        })
        console.log (input)
    }
    
    function handleSubmit(e){
        e.preventDefault();
        dispatch(PostActivity(input))
        alert('Congratulations you created a new activity!')
        setInput({
            name :'',
            duration:'',
            difficulty:'',
            season:'',
            country:[]
        })
    }

    function handleDelete(e){
        setInput({
            ...input,
            country: input.country.filter(country => country !== e )
        }) //este es para borrar algun tipe country que haya elegido, va a crear un nuevo array con todos los que no sean repetidos
    }//  
    
    return(
        <div className={styles.bkg}>
        <div className={styles.container}>

            <Link to ='/home' ><button className={styles.btn}>Back Home</button></Link>
            <h1 className={styles.h1}>Create your activity</h1>
            <form onSubmit={(e) => {handleSubmit(e)}} className={styles.form}>
                <div className={styles.tex}>
                    <label>name:</label>
                    <input 
                    className={styles.texinput}
                    type='text' 
                    name='name'
                    placeholder="name..."
                    value={input.name}
                    onChange={(e) => {handleChange(e)}}
                    required
                    />
                    { errors.name && (
                        <p className={styles.error}>{errors.name}</p>
                    ) }
                </div>

                <div className={styles.tex}>
                    <label>duration:</label>
                    <input
                    className={styles.texinput}
                    type='text'
                    name='duration'
                    placeholder="duration..."
                    value={input.duration}
                    onChange={(e) => {handleChange(e)}} 
                    />
                    { errors.duration && (
                        <p className={styles.error}>{errors.duration}</p>
                    ) }
                </div>

                <div className={styles.tex}>
                    <label>difficulty:</label>
                    <input
                    className={styles.texinput}
                    type='text'
                    name='difficulty'
                    placeholder="difficulty..."
                    value={input.difficulty}
                    onChange={(e) => {handleChange(e)}} 
                    />
                     { errors.difficulty && (
                        <p className={styles.error}>{errors.difficulty}</p>
                    ) }
                </div>
    
                <div className={styles.tex}>
                    <label>season:</label>
                    <input
                    className={styles.texinput}
                    type='text'
                    name='season'
                    placeholder="season..."
                    value={input.season}
                    onChange={(e) => {handleChange(e)}} 
                    />
                     { errors.season && (
                        <p className={styles.error}>{errors.season}</p>
                    ) }
                </div>
       
                  <select onChange={(e) => handleSelect(e)} className={styles.select} required>
                <option>Selecciona el pais donde de recrea la actividad</option>
                 { errors.country && (
                        <p className={styles.error}>{errors.country}</p>
                    ) }
                {listNamesCountries?.map((d) => (
                    <option key={d.name} value={d.name}>
                   {d.name}
                    </option>
                ))}
               
            </select>
                {errors.hasOwnProperty('name') || errors.hasOwnProperty('duration') || errors.hasOwnProperty('season') || errors.hasOwnProperty('difficulty')?  <p className={styles.adv}> please complete all the inputs to create your activity</p> : <button type='submit' className={styles.correct}> Create Activity</button>  }
               
            </form>
            
            {input.country.map(e => {
               return(
               <div >
                    <h5 className={styles.types}>{e}</h5>
                    <button className={styles.btnx} onClick={() => handleDelete(e)}>X</button>
                   
                </div>
            )})}

        </div>
        </div>
    )



}