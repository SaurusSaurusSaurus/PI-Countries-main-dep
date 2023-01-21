import React, { useEffect} from 'react';
import * as actions from "./../../Redux/actions/index";
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ActivityDetail from '../ActivityDetail/ActivityDetail';
import "./CountryDetail.css"
export default function CountryDetail() {
  const countryDetail = useSelector((state)=>state.detail)

  const dispatch = useDispatch();
  let {id} = useParams()
  useEffect(()=>{
    dispatch(actions.getDetail(id))
  },[dispatch,id])
  return (
    <div className='country_detail_main'>
      <Link to='/home'><button className='button_back'>Back home</button></Link>
      <div className='country_detail_text'>
        <h2>COUNTRY DETAIL</h2>
        <p>Get more info about this country</p>
      </div>
      <div className='country_detail_card'>
        {
          countryDetail ? 
          <>
            <div className="country_detail_img"><img src={countryDetail.flags} alt={countryDetail.id}/></div>
            <h4 className="country_detail_title">{countryDetail.name}</h4>
            <p className="country_detail_info">CAPITAL: {countryDetail.capital}</p>
            <p className="country_detail_info">CONTINENT: {countryDetail.continent}</p>
            <p className="country_detail_info">SUBREGION: {countryDetail.subregion}</p>
            <p className="country_detail_info">AREA: {countryDetail.area} km2</p>
            <p className="country_detail_info">POPULATION: {countryDetail.population} habitants</p>
            <h4 className="country_detail_act">ACTIVITIES</h4>
            {countryDetail.activities.length ? countryDetail.activities.map(a => {
              return(
              <ActivityDetail
                key={a.id}
                name={a.name}
                dificulty={a.dificulty}
                duration={a.duration}
                season={a.season}
              />)
            }
              ): <h5>No Activities yet...</h5>
            }

          </>:
          <>loading...</> 
        }
      </div>
    </div>)
}