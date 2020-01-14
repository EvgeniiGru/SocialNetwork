import React from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

let mapState = (state) => {
    return{
        isAU: state.appState.isAU
    }
}

export const withAuthentication = (Component) => {
    
     class RedirectHoc extends React.Component {
        render() {
            if (!this.props.isAU) return <Redirect to="/login" />
            return <Component {...this.props} />
        }
    }
return connect(mapState)(RedirectHoc);

}

