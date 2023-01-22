import './App.css';
import React from "react";
import {Route, Switch}
 from "react-router-dom";
import Nav from './Components/Nav/Nav';
import Home from './Components/Home/Home';
import LandingPage from './Components/LandingPage/LandingPage';
import CountryDetail from './Components/CountryDetail/CountryDetail';
import CreateActivity from './Components/CreateActivity/CreateActivity';
import ActivityCard from './Components/ActivityCard/ActivityCard';
import axios from "axios";
axios.defaults.baseURL="https://pi-countries-main-dep-production.up.railway.app/"
function App() {
  return (
    <>
      <Route exact path='/'>
        <LandingPage />
      </Route>
      <Switch> 
        <Route path="/home">
          <Nav/>
          <Home />
        </Route>
        <Route path="/create">
          <CreateActivity/>
        </Route>
        <Route path="/activities">
          <ActivityCard/>
        </Route>
        <Route path="/country/:id">
          <CountryDetail/>
        </Route>
      </Switch>
    </>
  );
}

export default App;
