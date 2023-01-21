//import React from "react";
import axios from "axios";
export const GET_ALL_COUNTRIES = "GET_ALL_COUNTRIES";
export const GET_DETAIL = "GET_DETAIL";
export const SEARCH_COUNTRIES = "SEARCH_COUNTRIES";
export const SORT_COUNTRIES_NAME = "SORT_COUNTRIES_NAME";
export const SORT_COUNTRIES_CONTINENT= "SORT_COUNTRIES_CONTINENT";
export const SORT_COUNTRIES_POPULATION = "SORT_COUNTRIES_POPULATION";
export const SORT_COUNTRIES_ACTIVITIES = "SORT_COUNTRIES_ACTIVITIES";
export const CREATE_ACTIVITY = "CREATE_ACTIVITY";
export const GET_ALL_ACTIVITIES = "GET_ALL_ACTIVITIES";
export const RESET_COUNTRIES = "RESET_COUNTRIES";


export const getAllCountries = () =>{
    return function(dispatch){
        axios.get("/countries/all")
        .then((countries)=>{
            dispatch({ // redux-thunk
                type: GET_ALL_COUNTRIES,
                payload: countries.data,
            })
        })
        .catch((error)=> {
            console.log(error)
        })
    }
}
export const resetCountries = () =>{
    return function(dispatch){
        try{
            dispatch({
                type: RESET_COUNTRIES,
            })
        } catch(error){
            console.log(error)
        }
        
    }
}
export const getAllActivities = () =>{
    return function(dispatch){
        axios.get("/activities")
        .then((activities)=>{
            dispatch({ // redux-thunk
                type: GET_ALL_ACTIVITIES,
                payload: activities.data,
            })
        })
        .catch((error)=> {
            console.log(error)
        })
    }
}
export const getDetail = (id) => {
    return function(dispatch){
        axios.get(`/countries/${id}`)
        .then((countries) => {
            dispatch({
                type: "GET_DETAIL",
                payload: countries.data
            })
        })
        .catch((error)=> {
            console.log(error)
        })
    }
}
export const searchCountries = (search) =>{
    return function(dispatch){
        if(search){
            axios.get(`/countries?name=${search}`)
            .then((countries) => {
                dispatch({
                    type: "SEARCH_COUNTRIES",
                    payload: countries.data
                })
            })
            .catch((error)=> {
                console.log(error)
            })
        }
    }
}
export const sortCountriesName = (payload) => {
    return {
        type: "SORT_COUNTRIES_NAME",
        payload:payload
    }
}
export const sortCountriesContinent = (payload) => {
    return {
        type: "SORT_COUNTRIES_CONTINENT",
        payload                            
    }
}
export const sortCountriesPopulation = (payload) => {
    return {
        type: "SORT_COUNTRIES_POPULATION",
        payload
    }
}
export const sortCountriesActivities = (payload) => {
    return {
        type: "SORT_COUNTRIES_ACTIVITIES",
        payload
    }
}
export const createActivity = (info)=> {
    return function(dispatch){
        axios.post('/activities',info)
        .then((activities)=>{
            console.log(activities)
            return activities
        })
        .catch((error)=> {
            console.log(error)
        })
    }
}


