import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux';
import { getAllCountries, createActivity } from '../../Redux/actions';
import "./CreateActivity.css"

function validate(input){
  let errors = {}
  if(!input.name){
    errors.name = "The name of the activity is required"
  } else if(/[^a-zA-Z0-9 ]/.test( input.name )){
    errors.name = "The name is invalid, can only contain alphanumeric characters"
  }

  if(!input.dificulty) errors.dificulty ="The difficulty is required"
  if(!input.duration) errors.duration = "The duration is required"
  if(!input.season) errors.season = "The season is required"
  if(!input.countries) errors.countries = "At least one countries is required"

  return errors;
}

export default function CreateActivity() {
  const dispatch = useDispatch();
  let history = useHistory();
  const countries = useSelector((state) => state.allCountries.sort((a,b) => a.name.localeCompare(b.name)))
  const [errors, setErrors] = useState({});
  const [activity, setActivity] = useState({
    name: '',
    dificulty: '',
    duration: '',
    season: '',
    countries: []
  })

  useEffect(()=>{
    dispatch(getAllCountries())
  },[dispatch])


  function onInputChange(e){
    e.preventDefault()
    setActivity({
      ...activity,
      [e.target.name] : e.target.value
    })
    setErrors(validate({
      ...activity,
      [e.target.name] : e.target.value
    }))
  }
  function onContinentChange(e){
    if(activity.countries.includes(e.target.value)) return alert(`${e.target.value} is already added`)
    setActivity({
      ...activity,
      countries: [...activity.countries, e.target.value ],
    })
  }
  function handleClick(e){
    setActivity({
      ...activity,
      countries:activity.countries.filter(u => u !== e)

    })
  }
  function onSubmit(e){
    e.preventDefault();
    console.log(activity)
    if(!activity.name || !activity.dificulty || !activity.duration || !activity.season || !activity.countries){
      return alert("Complete all the fields requested")
    } else {
      dispatch(createActivity(activity))
      console.log(activity)
      alert("Your activity has been created successfully")
      setActivity({
        name: '',
        dificulty: '',
        duration: '',
        season: '',
        countries: []
      })
        history.push("/home")
    }
  }
  return (
    <div className='create_activity_main'>
      <Link to='/home'><button className='button_back'>Back home</button></Link>
      <div className='create_activity_text'>
        <h2> CREATE YOUR ACTIVITY</h2>
        <p>Create your favourites activities</p>
      </div>
      <form onSubmit={onSubmit} className="create_activity_form">
        <div>
          <label htmlFor=''>Your activity name </label><br/>
          <input onChange={onInputChange} name="name"type="text" value={activity.name}/>
          {errors.name && (
            <p className='danger'>{errors.name}</p>  
          )}
        </div>
        <div>
          <label htmlFor=''> Difficulty (1-5) </label><br/>
          <input onChange={onInputChange} name="dificulty" type="range" id="vol" min="0" max="5" step="1" list="markers"></input>
          <datalist id="markers">
            <option value={"1"}></option>
            <option value={"2"}></option>
            <option value={"3"}></option>
            <option value={"4"}></option>
            <option value={"5"}></option>
          </datalist>
          {errors.dificulty && (
            <p className='danger'>{errors.dificulty}</p>  
          )}
        </div>
        <div>
          <label htmlFor=''> Duration (1-24 hours) </label><br/>
          <input onChange={onInputChange} type="number" id="quantity" name="duration" value={activity.duration} min="1" max="24"></input>
          {errors.duration && (
            <p className='danger'>{errors.duration}</p>  
          )}
        </div>
        <div>
          <label htmlFor=''> Season </label><br/>
          <select onChange={onInputChange} name="season">
            <option value={""}>Select</option>
            <option value={"Summer"}>Summer</option>
            <option value={"Autumn"}>Autumn</option>
            <option value={"Winter"}>Winter</option>
            <option value={"Spring"}>Spring</option>
          </select>
          {errors.season && (
            <p className='danger'>{errors.season}</p>  
          )}
        </div>
        <div>
          <label  htmlFor=''> Countries </label><br/>
          <select onChange={onContinentChange}  name="countries">
            <option>Select</option>
            {countries.length ? countries.map((c)=>{
              return (
              <option key={c.id} value={c.name}>{c.name}</option> )
              })
              :null
            }
          </select>
          {errors.countries && (
            <p className='danger'>{errors.countries}</p>  
          )}
        </div>
        <div className='country_select'>
        {
        activity.countries.map((c,index) => 
          <div className='country_select_button' key={index}>
            <p >{c}<button onClick={()=>handleClick(c)}> x </button></p>
          </div>)
        }
        </div>
        <div>
          <input type="submit" value="Create Activity"/>
        </div>
      </form>
    </div>
  )
}

