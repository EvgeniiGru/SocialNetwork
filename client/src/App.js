import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import ListMesseges from './components/Messages/listMessages/listMessage';
import { Route } from 'react-router-dom';
import ItemMessagesContainer from './components/Messages/ItemMessages/itemMessagesContainer';
import MainGalleryContainer from './components/Gallery/GelleryContainer';
import SearchFrendsContainer from './components/SearchFrends/SearchFrendsContainer';
import ProfileConteiner from './components/Profile/ProfileConteiner';
import AUContainer from './components/Authentication/AuthenticationConteiner';
import FrendsContainer from './components/Frends/FrendsConteiner';
import NavBarContainer from './components/Navbar/NavContainer';
import { Redirect } from 'react-router-dom';



const App = (props) => {
  if (!props.isAU) {
    return (
      <div className="app-wraper">
        <Header />
        <Redirect to="/login" />
        <Route path="/login" render={() => <AUContainer />} />
      </div>)
  } else {
     return (
      <div className="app-wraper">
        <Header />
        <NavBarContainer />
        <Route path='/profile/id:userId' render={() => <ProfileConteiner />} />
        <Route path='/dialog' render={() => <ListMesseges/>} />
        <Route path="/message" render={() => <ItemMessagesContainer />} />
        <Route path='/gallery' render={() => <MainGalleryContainer />} />
        <Route path='/search' render={() => <SearchFrendsContainer />} />
        <Route path='/news' component={News} />
        <Route path='/music' component={Music} />
        <Route path='/settings' component={Settings} />
        <Route path='/frends' render ={() => <FrendsContainer/>}/>
        </div>
        )
    }
  }
  
  export default App;
