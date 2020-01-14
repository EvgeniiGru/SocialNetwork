import { connect } from "react-redux";
import { unfollowThunk, followThunk, changePage, changePreload,getUsers } from "../../redux/UsersReduser";
import AllUsers from "./SearchFrends";
import React from 'react';
import Preloader from "../Logo/Preload";
import { withRouter } from 'react-router-dom';
import { withAuthentication } from "../Hoc/withAUHoc";
import { compose } from "redux";

class SearchFrends extends React.Component {

    componentDidMount() {
        this.props.getUsers(this.props.count, this.props.pageNow)
    }

    onChangePage = (pageNumber) => {
        this.props.changePage(pageNumber);
        this.props.getUsers(this.props.count, pageNumber)
    }

    followFn = (userID) => {
        this.props.followThunk(userID)
    }

    unFollowFn = (userID) => {
        this.props.unfollowThunk(userID)
    }

    render() {
        return (
            <>
            {this.props.preload? <Preloader/>: null}
                <AllUsers {...this.props} 
                    onChangePage={this.onChangePage}
                    followFn = {this.followFn}
                    unFollowFn = {this.unFollowFn}/>
            </>)
    }
}

let mapSate = (state) => {
    return {
        ...state.users
    }
}

export default compose(
    connect(mapSate, {
        unfollowThunk,
        followThunk,
        getUsers,
        changePage,
        changePreload
    }),
    withRouter,
    withAuthentication
  )
  (SearchFrends);;