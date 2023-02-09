const IncialState = {
    Countries:[],
    CountriesCopy:[],
    CountriesCopyTwo:[],
    NamesCountries:[],
    Activities:[],
    details:[]
}

export default function rootReducer(state = IncialState, action){

    switch(action.type){
        case "GET_COUNTRY":
        return{
            ...state,
            Countries: action.payload,
            CountriesCopy: action.payload,
            CountriesCopyTwo: action.payload
        }

        case "GET_NAMES":
        return{
            ...state,
            NamesCountries: action.payload
        }

        case "GET_ACTIVITIES":
        return{
            ...state,
            Activities: action.payload
        }   

        

        case 'ORDER_BY_NAME' :
           let order = action.payload === 'asc' ? 
              state.Countries.sort(function(a,b) {

                if(a.name.toLowerCase() > b.name.toLowerCase()) {

                    return 1
                }
                if( b.name.toLowerCase() > a.name.toLowerCase()){
                    return -1
                 }
                return 0
              }) : 
              state.Countries.sort(function(a,b) {

                  if(a.name.toLowerCase() > b.name.toLowerCase()) {
                    return -1
                  }
                  if( b.name.toLowerCase() > a.name.toLowerCase()){
                    return 1
                  }
                return 0
              })
        return{
            ...state,
            Countries: order
        }
        
        case 'TIDY_POPULATION':
             
            let TidyPopulation = action.payload === 'min' ?
    
            state.Countries.sort(function(a,b) {
                      
                if(a.population > b.population) {
                  
                    return 1
                }
                if( b.population > a.population){
                    return -1
                }
                return 0
            }) : 
            state.Countries.sort(function(a,b) {
                if(a.population > b.population) {
                    return -1
                }
                if( b.population > a.population){
                    return 1
                }
                return 0
             })
        return{
            ...state,
            Countries: TidyPopulation
        }

        // case "CLEAN":
        // return{
        //     ...state,
        //     details:action.payload
        // }

        case "FILTER_FER_ACTIVITIES":
                action.payload === 'All' ? state.Countries = state.CountriesCopy.filter(info => info.activities.length) :
                state.Countries = state.CountriesCopy.filter(name => name.activities.find((element) => element.name?.toLowerCase() === action.payload))
        return {
            ...state,
            Countries: state.Countries
        }
        

        case "FILTER_CONTINENTS":
            const AllCon = state.CountriesCopy
            const TypeCountryFilter = action.payload === "all"? AllCon : AllCon?.filter((t)=>t.continents.includes(action.payload))
        return{
            ...state,
           Countries: TypeCountryFilter
        }

        case "GET_BY_ID":
        return{
            ...state,
            details: action.payload
        }

        case "GET_BY_NAME":
        return{
            ...state,
            Countries: action.payload
        }

        
        default:{
            return state
        }

    }


}