import { useDispatch, useSelector } from "react-redux";
import { getAllActivities, sortCountriesName, sortCountriesContinent, sortCountriesPopulation, sortCountriesActivities, getAllCountries} from "../../Redux/actions";
import "./Sort.css"
import React, { useEffect } from 'react'

export default function Sort() {
    const dispatch = useDispatch();
    const activities = useSelector((state)=>state.activities)
    useEffect(()=> {
        dispatch(getAllActivities());
        dispatch(getAllCountries());
      },[dispatch])
    function onSelectChangeName(e) {
      e.preventDefault()
      dispatch(sortCountriesName(e.target.value))
    }
    function onSelectChangePop(e) {
      e.preventDefault()
      dispatch(sortCountriesPopulation(e.target.value))
    }
    //FILTERS
    function onSelectChangeCont(e) {
      console.log(e.target.value)
      dispatch(sortCountriesContinent(e.target.value))
    }
    function onSelectChangeAct(e) {
      e.preventDefault()
      dispatch(sortCountriesActivities(e.target.value))
    }
  return (
    <div className="sort_body">
        <label>Order by name</label>
        <select name="select" onChange={onSelectChangeName}>
            <option value="" >Select</option>
            <option value={"DESCENDENTE"}> Ascendent</option>
            <option value={"ASCENDENTE"}>Descendent</option>
        </select>
        <label>Order by population</label>
        <select name="select" onChange={onSelectChangePop}>
            <option value="" >Select</option>
            <option value={"MINOR"}>Minor population</option>
            <option value={"MAJOR"}>Major population</option>
        </select>
        {/* FILTERS */}
        <label>Filter by continent</label>
        <select name="select" onChange={onSelectChangeCont}>
            <option value={""}>Select</option>
            <option value={"All"}>All</option>
            <option value={"Africa"}>Africa</option>
            <option value={"Antarctica"}>Antarctica</option>
            <option value={"Asia"}>Asia</option>
            <option value={"Europe"}>Europe</option>
            <option value={"North America"}>North America</option>
            <option value={"South America"}>South America</option>
            <option value={"Oceania"}>Oceania</option>
        </select>
        <label>Filter by activities</label>
        <select name="select" onChange={onSelectChangeAct}>
            <option value={""}>Select</option>
            <option value={"All"}>All</option>
            {activities.length ? activities.map((c)=>{
              return (
              <option key={c.id} value={c.name}>{c.name}</option> )
              })
              : <option disabled>No activities</option>
            }
        </select>
    </div>
  )
}
