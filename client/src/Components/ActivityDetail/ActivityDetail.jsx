import React from 'react'
import "./ActivityDetail.css"
function ActivityDetail(activity) {
  return (
    <div className='activity_detail_body'>
      <div className="activity_detail_card">
          <h3>{activity.name}</h3>
          <h5>Difficulty: {activity.dificulty}</h5>
          <h5>Duration: {activity.duration}</h5>
          <h5>Season: {activity.season}</h5>
      </div>
    </div>
  )
}

export default ActivityDetail