import { CREATE_ACTIVITY, GET_ALL_ACTIVITIES, GET_ALL_COUNTRIES, GET_DETAIL, SEARCH_COUNTRIES, SORT_COUNTRIES_NAME, SORT_COUNTRIES_CONTINENT, SORT_COUNTRIES_POPULATION, SORT_COUNTRIES_ACTIVITIES, RESET_COUNTRIES } from "../actions";

let index = 1;

const initialState = {
    allCountries: [],
    filterCountries:[],
    activities: [],
    detail: undefined,
}

export default function rootReducer(state = initialState, action){
    const allCountries = state.allCountries;
    switch(action.type){
        case GET_ALL_COUNTRIES:
            return {
                ...state,
                allCountries: action.payload,
                filterCountries: action.payload
            }
        case RESET_COUNTRIES:
            return {
                ...state,
                allCountries: state.allCountries,
            }
        case GET_DETAIL:
            return {
                ...state,
                detail: action.payload,
            }
        case SEARCH_COUNTRIES:
            const search = action.payload ==="" ? state.countries : action.payload
            return{
                ...state,
                allCountries: search,
            };
        case SORT_COUNTRIES_NAME:
            let orderedCountries = [...state.allCountries];
            orderedCountries = orderedCountries.sort((a,b)=> {
                if(a.name<b.name){
                    return action.payload === "ASCENDENTE" ? -1:1;
                }
                if(a.name >b.name) {
                    return action.payload === "ASCENDENTE" ? 1:-1;
                }
                return 0;
            })
            return{
                ...state,
                allCountries: orderedCountries
            };
        case SORT_COUNTRIES_POPULATION:
            let orderedCountriesP = [...state.allCountries];
            orderedCountriesP = orderedCountriesP.sort((a,b)=> {
                if(a.population<b.population){
                    return action.payload === "MINOR" ? -1:1;
                }
                if(a.population >b.population) {
                    return action.payload === "MINOR" ? 1:-1;
                }
                return 0;
            })
            return{
                ...state,
                allCountries: orderedCountriesP
            };
        case SORT_COUNTRIES_CONTINENT:
            console.log(state.filterCountries)
            const continentSort = action.payload === 'All'
            ? state.filterCountries: allCountries.filter((c)=>c.continent === action.payload)
            if(continentSort.length>0){
                return {
                    ...state,
                    allCountries: continentSort
                }
            }
            if(continentSort.length===0) {
                console.log(allCountries.length)
                const continentSort = action.payload === 'All'
                ? state.filterCountries: state.filterCountries.filter((c)=>c.continent === action.payload)
                return{
                    ...state,
                    allCountries: continentSort
                }
            }
            return{
                ...state,
                allCountries: state.filterCountries
            };
        case SORT_COUNTRIES_ACTIVITIES:
            const allActivities = state.activities;
            const activitySort= allActivities && action.payload === 'All'
            ? allCountries.filter(c=> c.activities.lengt>0): 
            allCountries.filter((c)=>c.activities.find(a=>a.name=== action.payload))
            if(activitySort.length>0){
                return {
                    ...state,
                    allCountries: activitySort
                }

            } 
            return{
                ...state,
                allCountries: state.filterCountries
            };
        case GET_ALL_ACTIVITIES:
            return {
                ...state,
                activities: action.payload,
            }
        case CREATE_ACTIVITY:
            return{
                ...state,
                activities: [...state.activities, {...action.payload,id: index++ }],
            };
        default: return {...state}
    }
}