import React, { useState, useEffect} from 'react';
import { useDispatch, useSelector} from "react-redux";
import { getAllCountries } from '../../Redux/actions';
import CountryCard from "../CountryCard/CountryCard";
import Pagination from '../Pagination/Pagination';
import Sort from '../Sort/Sort';
import "./Home.css"

export default function Home() {

    const dispatch = useDispatch();
    const allCountries = useSelector((state)=>state.allCountries)
    useEffect(()=> {
      dispatch(getAllCountries());
    },[dispatch])

    const [currentPage, setCurrentPage] = useState(1);
    const [countriesPerPage] = useState(9);
    const indexOfLastCountry = currentPage * countriesPerPage;
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
    const currentCountries = allCountries.slice(indexOfFirstCountry, indexOfLastCountry)
    return (
      <div className="home">
        <div className='main_title'>
          <h1>COUNTRIES OF THE WORLD</h1>
          <p>Discover all the countries of the world in one place🌐🗺️🫧</p>
        </div>
        <Sort/>
        <Pagination
            countriesPerPage={countriesPerPage}
            totalCountries={allCountries.length}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
        />
        <div className= "cards_home">
          {
            (
              currentCountries.length?currentCountries.map(c=>
              <CountryCard 
              key={c.id} 
              id={c.id} 
              name={c.name} 
              flag={c.flags}
              continent={c.continent}
              />
              ):<h1>Error 505</h1>
            )
          }
        </div>
      </div>
      )
    }