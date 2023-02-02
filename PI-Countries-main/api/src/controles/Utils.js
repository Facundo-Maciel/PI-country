const axios = require ("axios");
const {Country, Activity} = require ("../db");

//creacion  de todas las funciones para aplicar en sus respectivos controles de county y  Activity 

//Funcion para traerme la informacion de la API

const GetInfoApiCountries = async()=>{

    let UrlApiCountri =  await axios.get(`https://restcountries.com/v3.1/all`)

    let infoDd = await Country.findAll()

    if(infoDd.length === 0){   

    let infoApiCountri = await UrlApiCountri.data.map((info) => {
        return{
            id: info.cca3,
            name: info.name.common,
            flag: info.flags.png,
            continents: info.region,
            capital: info.capital ? info.capital : "unknown capita",
            subregion: info.subregion ? info.subregion : "unknown subregion",
            area: info.area,
            population: info.population
        }

    })

    infoDd = await Country.bulkCreate(infoApiCountri,)

    }

    let fullData = await Country.findAll({include:Activity})

    return fullData; 

}


 //Funcion para buscar  API un Country mediante su id........ 

//  const GetIdCountry= async(id)=>{
//     let codeInMayus = id.toUpperCase() 
//     let country

//     if(codeInMayus.length > 1){
    
//         country=  await Country.findByPk(codeInMayus, {include: Activity})
        
//         country = {
//             id: country.id,
//             name: country.name,
//             flag: country.flag,
//             region: country.region,
//             capital: country.capital,
//             subregion: country.subregion,
//             area: country.area,
//             population: country.population,
//             activities: country.Activities.map((info)=>{
//                 return{
//                     id: info.id,
//                     name: info.name,
//                     difficulty: info.difficulty,
//                     duration: info.duration, 
//                     season: info.season 
//                 }
//             }) 
//         }
//     }
    
//     // console.log(country)
//     return country

//     // const country = await Country.findAll({
//     //     where: {id: id.toUpperCase()},
//     //     include: Activity
//     // })
//     // console.log(country)
//     // return country
     
//     // let codeInMayus = id.toUpperCase() 
//     // let countries = await Country.findOne({
//     //     where:{
//     //         id: codeInMayus
//     //     }
//     // })
//     // console.log(countries)
//     // return countries 

// }

 const GetInfoCountry = async(id) =>{

     try{

         const info  = await axios.get(`https://restcountries.com/v3/alpha/${id}`,)

         const GetApiData = await info.data.map(info =>{
            return  {
                id: info.cca3,
                name: info.name.common,
                flag: info.flags.png,
                continents: info.region,
                capital: info.capital ? info.capital : "unknown capita",
               subregion: info.subregion ? info.subregion : "unknown subregion",
                area: info.area,
                population: info.population
                
           }
         })  
          return GetApiData
     }catch(error){
        console.log(error)
    }


}


module.exports = {

    GetInfoApiCountries,

    GetInfoCountry,

}