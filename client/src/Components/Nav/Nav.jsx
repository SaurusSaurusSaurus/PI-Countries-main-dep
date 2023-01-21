import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAllCountries } from '../../Redux/actions';
import SearchBar from '../SearchBar/SearchBar';
import './Nav.css';

export default function Nav() {
    const dispatch = useDispatch();
    function handleClick(e){
        e.preventDefault();
        dispatch(getAllCountries());
    }
    return (
        <header className="navbar">
            <nav>
                <ul className="navbar_body">
                    <li className="navbar_list_item">
                        <NavLink exact to="/home" onClick={handleClick} ><img alt="home" src={"https://cdn-icons-png.flaticon.com/512/4175/4175279.png"} width="30" height="30"/></NavLink>
                        <NavLink exact to="/home" onClick={handleClick} >Home</NavLink>
                        <NavLink to="/create" >Create Activity</NavLink>
                        <NavLink to="/activities" >Activities</NavLink>
                    </li>
                </ul>
            </nav>
            <SearchBar />
        </header>
    )
}
