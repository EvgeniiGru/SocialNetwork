import React from 'react';
import "./../Navbar/Nav.css";
import NavBar from './Nav';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class NavBarClass extends React.Component { 
  render(){
    return <NavBar {...this.props}/>
  }
}

let mapState = (state) => {
 return {...state.navBar}
} 

const NavBarContainer = connect(mapState,)(NavBarClass)

export default NavBarContainer;