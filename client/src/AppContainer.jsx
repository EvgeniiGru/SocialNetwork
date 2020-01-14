import React from 'react';
import { questionSession } from './API/api';
import App from './App';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAU } from './redux/AppaState';

class AppClass extends React.Component {
  
  componentWillMount() {
   this.props.getAU();
  }

  render() {
    return <App isAU={this.props.isAU} />
  }

}

let mapState = (state)=>{
  return{
    isAU: state.appState.isAU
  }
}
 
const RefreshApp = withRouter(AppClass);

const AppConteiner = connect(mapState,{getAU})(RefreshApp)

export default AppConteiner;
