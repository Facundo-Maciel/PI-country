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
            capital: info.capital ? info.capital : "unknown capital",
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


 
 const GetInfoCountry = async(id) =>{

     try{

         const info  = await GetInfoApiCountries();

        const GetApiCountry = await info.filter(info=>info.id===id)

         const GetApiData = await GetApiCountry.map(info =>{
            return  {
                id: info.id,
                name: info.name,
                flag: info.flag,
                continents: info.continents,
                capital: info.capital ? info.capital[0].data : "unknown capital",
                subregion: info.subregion ? info.subregion : "unknown subregion",
                area: info.area,
                population: info.population,
                activities: info.activities.map((info)=>{
                    return{
                        id: info.id,
                        name: info.name,
                        difficulty: info.difficulty,
                        duration: info.duration, 
                        season: info.season 
                    }
                })             
           }
         })

          return GetApiData
     }catch(error){
        console.log(error)
    }

}

const GetNames = async() =>{

    try{

        const infoApi  = await GetInfoApiCountries();

        const GetApiData = await infoApi.map(info =>{
           return  {  
               name: info.name              
          }
        })

         return GetApiData
    }catch(error){
       console.log(error)
   }

}


const GetActivityInfo = async () => {
    try {
      let DietsDB = await  Activity.findAll(); //guard
      DietsDB =  DietsDB.map((d) => d.toJSON());   //mapea uno por uno y lo convierte en json
      let fullData = await Activity.findAll({include:Country})  
      return fullData;
     } catch (error) {
       console.log(error);
    }
   }


module.exports = {

    GetInfoApiCountries,
    GetInfoCountry,
    GetActivityInfo,
    GetNames,

}