import React from 'react';
import { Link } from 'react-router-dom';
import './CountryCard.css'

function CountryCard(props) {
  //console.log(props)
  return (
    <div className ="country_card_body">
        <div className="country_card_img"><img src={props.flag} alt={props.id}/></div>
        <h3 className="country_card_title">{props.name}</h3>
        <h4 className="country_card_continent">{props.continent}</h4>
      <Link to={`/country/${props.id}`}>
        <button className='country_card_button'>Detail</button>
      </Link> 
    </div>
  )
}

export default CountryCard;
