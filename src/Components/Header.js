import React from 'react'
import {NavLink} from 'react-router-dom'
import {CHARACTERS_ROUTE, EPISODES_ROUTE, LOCATIONS_ROUTE, WATCHLIST_ROUTE} from "../Utils/consts";

const neon = {color: "#fff", textShadow: "0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff"}

function Header(){
    return (
        <header className="border-b p-3 flex justify-between items-center bg-gray-300" style={{background: "#24292f"}}>
            <h1 className="ml-8" style={{fontSize: 25, color: "#FFFFFF", fontWeight: "bold"}} >
                Rick & Morty
            </h1>
            <NavLink to={CHARACTERS_ROUTE} className="mx-8" style={{fontSize: 25, color: "#FFFFFF"}} activeStyle={neon} >
                Characters
            </NavLink>
            <NavLink to={EPISODES_ROUTE} className="mx-8" style={{fontSize: 25, color: "#FFFFFF"}} activeStyle={neon} >
                Episodes
            </NavLink>
            <NavLink to={LOCATIONS_ROUTE} className="mx-8" style={{fontSize: 25, color: "#FFFFFF"}} activeStyle={neon} >
                Locations
            </NavLink>
            <NavLink to={WATCHLIST_ROUTE} className="mx-8" style={{fontSize: 25, color: "#FFFFFF"}} activeStyle={neon} >
                My watch list
            </NavLink>
        </header>
    )
}

export default Header;