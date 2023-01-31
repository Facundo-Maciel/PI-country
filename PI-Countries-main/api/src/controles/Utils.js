const axios = require ("axios");
const {Country, Activity} = require ("../db");

//creacion  de todas las funciones para aplicar en sus respectivos controles de county y  Activity 

//Funcion para traerme la informacion de la API

const GetInfoApiCountries = async()=>{

    let UrlApiCountri =  await axios.get(`https://restcountries.com/v3.1/all`)

    const infoApiCountri =  UrlApiCountri.data.map((info) => {
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

    return infoApiCountri;

}

//funcion para obtener informacion de Activity en DB  ......  
const GetInfoDbActivity = async() => {

    let GetInfoCountry = await Activity.findAll({

        include:{
            model: Country,
            attributes: ["id", "name", "flag", "continents", "capital", "subregion", "area", "population"],
            through: {attributes: []}
        }
    })

    return GetInfoCountry.map(activity =>{
        let type = Country.activity.map(d => d.id , d.name , d.flag , d.continents , d.capital, d.subregion , d.area , d.population)
        return {
            name: activity.name,
            id: activity.id,
            difficulty: activity.difficulty,
            duration: activity.duration,
            season: activity.season,

            country: type
        }

    })

}

 // funcion de Concatenancion de Countries de la api y de las Actividades creadas en db ......
const GetAllInfoActivities = async() =>{

    const infoApi = await GetInfoApiCountries();
    const infoDb = await GetInfoDbActivity();

    const fullInfo  = infoApi.concat(infoDb);

    return fullInfo;

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

         const info  = await axios.get(`https://restcountries.com/v3/alpha/${id}`).results.data

         let countryApi

         countryApi = {
             id: info.cca3,
             name: info.name.common,
             flag: info.flags.png,
             continents: info.region,
             capital: info.capital ? info.capital : "unknown capita",
            subregion: info.subregion ? info.subregion : "unknown subregion",
             area: info.area,
             population: info.population
        }
          return [countryApi]  
     }catch(error){
        console.log(error)
    }


}

// const getCountry = async (req, res) => {

//     try {
//       // *Busqueda de ciudad por id 
//       const { id } = req.params;// peticion por params
//       // Guardo en una constante la busqueda de los country
//       const getDB = await Country.findAll({
//         where: { id: id.toUpperCase() },
//         attributes: { exclud: ["capital", "subregion"] },//excluyo los dos atributos
//         include: Activity//incluyo la actividad existente
//       });
//       //responde ok 
//       return res.send(getDB);
  
//     } catch (error) {
//       //responde error
//       return res.status(400).send({ msg: error.message });
//     }
//   };

module.exports = {

    GetInfoApiCountries,
    GetInfoDbActivity,
    GetAllInfoActivities,
    GetInfoCountry

}