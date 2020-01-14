import React from 'react';
import { connect } from 'react-redux';
import { ChangeMail, ChangePassword, ChangeLog, ChangeReg, setLocalStorage} from '../../redux/AU'
import { setAU } from '../../redux/AppaState'
import Authentication from './Authentication';
import { withRouter } from 'react-router-dom';
import { qureAU, questionSession } from '../../API/api';
import { setUpLoad } from '../../redux/NavBarRedus' ;

class AU extends React.Component {

    componentWillUnmount()
 {
        questionSession().then(res => {     
           if (res.AU ){
               this.props.history.push(`/profile/id${res.user.idUser}`);
               this.props.setLocalStorage(res.user);
            }else{
                this.props.history.push(`/login`)
            }
        }
        )
    }

    authenticationUser() {
        
        qureAU(this.data.mail, this.data.password).then(res => {
            this.data.setAU(res.AU);
        if (res.AU){
            this.data.history.push(`/profile/id${res.idUser}`) 
            this.data.setUpLoad(res.idUser)
        }else{
             alert(res.message)
            }
        })
    }

    render() {
        return (
            <Authentication data={this.props}
                authenticationUser={this.authenticationUser} />
        )
    }
}

let MapState = (state) => {
    return ({
        ...state.authentication
    })
}

const UrlDateComponent = withRouter(AU);

const AUContainer = connect(MapState, {
    setLocalStorage,
    ChangeMail,
    ChangePassword,
    ChangeLog,
    ChangeReg,
    setAU,
    setUpLoad
})(UrlDateComponent);

export default AUContainer;