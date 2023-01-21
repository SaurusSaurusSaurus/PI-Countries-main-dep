import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import "./LandingPage.css"
export default class LandingPage extends Component {
  render() {
    return (
      <div className='container'>
        <div className='content'>
          <video className="back-video" autoPlay loop muted >
            <source src="https://prod-streaming-video-msn-com.akamaized.net/62fc0010-fd72-48f2-9c98-4ef78830ae2e/cc591257-cad6-4e01-b7f5-fccbccb4d708.mp4" type="video/mp4"/>
          </video>
          <h1 className='title_landing'>HENRY COUNTRIES </h1>
          <Link to='/home'><button className='button_landing'>Explore</button></Link>
        </div>
      </div>
    )
  }
}
