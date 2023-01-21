import React, { useEffect } from 'react';
import * as actions from "./../../Redux/actions/index";
import { useDispatch, useSelector } from 'react-redux';
import ActivityDetail from '../ActivityDetail/ActivityDetail';
import "./ActivityCard.css"
import { Link } from 'react-router-dom';

function ActivityCard() {
  const dispatch = useDispatch();
  const allActivities = useSelector((state)=>state.activities)

    useEffect(()=> {
      dispatch(actions.getAllActivities());
    },[dispatch])
  return (
   <div className='activity_card_main'>
      <Link to='/home'><button className='button_back'>Back home</button></Link>
      <div className='activity_card_text'>
        <h2>ALL THE ACTIVITIES</h2>
        <p>Here are the best activities of the world</p>
      </div>
      <div className='activity_card'>
        {
            (
              allActivities.length?allActivities.map(c=>
              <ActivityDetail
                key={c.id} 
                id={c.id} 
                name={c.name} 
                dificulty={c.dificulty}
                duration={c.duration}
                season={c.season}
              />
              ):<h1>No activities yet, please create one...</h1>
            )
        }
      </div>
   </div>
  )
}

export default ActivityCard