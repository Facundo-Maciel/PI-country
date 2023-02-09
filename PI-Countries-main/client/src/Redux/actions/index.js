import axios from "axios";


export function GetCountry(){

    return async function(dispatch){
        let Json = await axios.get(`http://localhost:3001/`)
        dispatch({
            type: "GET_COUNTRY",
            payload: Json.data
        })
    }
}

export function GetNamesCountries(){

    return async function(dispatch){
        let Json = await axios.get(`http://localhost:3001/countryNames/`)
        console.log(Json);
        dispatch({
            type: "GET_NAMES",
            payload: Json.data
        })
    }
}

export function GetRecipesByName(name){

    return async function(dispatch){
        var json = await axios.get(`http://localhost:3001/?name=${name}`)
        return dispatch ({
          type : "GET_BY_NAME",
          payload: json.data
        })
      }

}

export function GetCountryById(id){

    return async function(dispatch){
      var json = await axios.get(`http://localhost:3001/country/${id}`)
      return dispatch ({
        type : "GET_BY_ID",
        payload: json.data
      })
    }
  
  }

export function FilterContinents(payload){

    return{
        type: "FILTER_CONTINENTS",
        payload
    }

}

export function FilterFerActivities(payload){

    return{
        type: "FILTER_FER_ACTIVITIES",
        payload
    }

}

export function TidyAlphabetically(payload){
  
    return {
        type : "ORDER_BY_NAME",
        payload
    }
  
}

export function TidyPopulation(payload){

    return{
        type: "TIDY_POPULATION",
        payload
    }
}

export function PostActivity(payload){

     return async function(dispatch){
         var json = axios.post(`http://localhost:3001/activity/`,payload)
        return json
    } 
}

export function GetActivities(){

    return async function(dispatch){
        let Json = await axios.get(`http://localhost:3001/activity`)
        dispatch({
            type: "GET_ACTIVITIES",
            payload: Json.data
        })
    }

}

// export function cleandetail(){
//     return{
//       type:"CLEAN",
//       payload :[]
//     }
// }

