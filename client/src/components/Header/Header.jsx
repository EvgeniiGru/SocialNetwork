import React from 'react';
import logo from './../Header/siteLogo.png';
import "./../Header/Header.css"
import {NavLink} from 'react-router-dom'

const Header = () => {
  return  <header className="header">
           <img src={logo} className="header_logo"
            alt="logo"></img>
            <NavLink to = '/login' className="exit">Exit</NavLink>
         </header>
}

export default Header;