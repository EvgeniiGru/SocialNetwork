import React from 'react';
import "./../Navbar/Nav.css";
import {NavLink} from 'react-router-dom';


const NavBar = (props) => {
  return <nav className="navigator">
    <div className="navigator_item">
      <a href={"/profile/id" + localStorage.getItem("idUser")}>Profile</a>
    </div>
    <div className="navigator_item">
      <NavLink to="/dialog">Messages</NavLink>
    </div >
    {/* <div className="navigator_item">
      <NavLink to="news">News</NavLink>
    </div>
    <div className="navigator_item">
      <NavLink to="/music">Music</NavLink>
    </div> */}
    <div className="navigator_item">
      <a href="/gallery">Gallery</a>
    </div>
    <div className="navigator_item">
      <NavLink to="/search">Search Frends</NavLink>
    </div>
    {/* <div className="navigator_item">
      <NavLink to="/settings">Settings</NavLink>
    </div> */}
    <div className="navigator_item">
      {/* {props.valueNewFrends>0? 
      <NavLink to="/frends">{'Frends(' + props.valueNewFrends +')'}</NavLink>: */}
      <NavLink to="/frends">Frends</NavLink>
    </div>
  </nav>
}

export default NavBar;
