import React from 'react'
import { connect } from 'react-redux'
import Frends from './Frends'
import { withRouter } from 'react-router-dom'
import { changePage, getFrends, ChangeCheckBoxValue } from './../../redux/FrendReduser'
import Preloader from '../Logo/Preload'
import { frendsQurePost } from '../../API/apiPost'
import { frendsQureDelete, unfollow, mayBeFrendDel } from '../../API/apiDel'
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

    addFrends = (frendID) => {
        let Th = this;
        frendsQurePost(frendID).then(res => {
            Th.onChangePage(1);
        });
    }

    delFrends = (frendID) => {
       
        let Th = this;
        frendsQureDelete(frendID).then(res => {
            Th.onChangePage(1);
        });
    }

    unfollowFrends = (frendID) => {
        let Th = this;
        unfollow(frendID).then(res => {
            Th.onChangePage(1);
        });
    }

    wayBeFrendDelet = (frendID) => {
        let Th = this;
        mayBeFrendDel(frendID).then(res => {
            Th.onChangePage(1);
        })
    }

    render() {
        return (
            <>
                {this.props.preload ? <Preloader /> : null}
                <Frends {...this.props}
                    onChangePage={this.onChangePage}
                    addFrends={this.addFrends}
                    delFrends={this.delFrends}
                    unfollowFrends={this.unfollowFrends}
                    wayBeFrendDelet={this.wayBeFrendDelet} 
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
        getFrends,
        changePage,
        ChangeCheckBoxValue
    }) ,
    withRouter,
    withAuthentication
  )(FrendClass);;