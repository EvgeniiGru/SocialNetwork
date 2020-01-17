import React from 'react'
import { connect } from 'react-redux'
import Frends from './Frends'
import { withRouter } from 'react-router-dom'
import { changePage, getFrends,ChangeCheckBoxValue, addFrends, delFrends, unfollowFrends, wayBeFrendDelet } from './../../redux/FrendReduser'
import Preloader from '../Logo/Preload'
import { withAuthentication } from '../Hoc/withAUHoc'
import { compose } from 'redux'

class FrendClass extends React.Component {

    componentDidMount() {
        this.props.getFrends(this.props.count, this.props.pageNow)
    }

    onChangePage = (pageNumber) => {
        this.props.changePage(pageNumber);
        this.props.getFrends(this.props.count, pageNumber)
    }

    render() {
        return (
            <>
                {this.props.preload ? <Preloader /> : null}
                <Frends {...this.props}
                    onChangePage={this.onChangePage}
                    takeFunction={this.takeFunction}/>
            </>)
    }
}

let mapState = (state) => {
    return {
        ...state.frends
    }
}

export default compose(
    connect(mapState, {
        wayBeFrendDelet,
        unfollowFrends,
        addFrends,
        delFrends,
        getFrends,
        changePage,
        ChangeCheckBoxValue
    }) ,
    withRouter,
    withAuthentication
  )(FrendClass);
