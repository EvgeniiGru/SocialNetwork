import { userQure } from "../API/api";
import { queryFollow } from "../API/apiPost";
import { unfollow } from "../API/apiDel";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USER = "SET_USER";
const SET_MAX_PAGE = "SET_MAX_PAGE";
const CHANGE_PAGE = "CHANGE_PAGE";
const PRELOAD = "PRELOAD";

let initialization = {
    users: [],
    maxPage: [],
    pageNow: 1,
    count: 5,
    preload: true
};

const UserReduser = (state = initialization, action) => {
    switch (action.type) {
        case FOLLOW:
                return {
                    ...state,
                    users: state.users.map(user => {
                        if (user.id === action.userId) {
                            return {
                                ...user,
                                follower: true
                            }
                        }
                        return user;
                    })
                }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return {
                            ...user,
                            follower: false
                        }
                    }
                    return user;
                })
            }
        case SET_USER:
            return {
                ...state,
                users: action.users.map(user=>{
                    if(action.frendsRequests.includes(user.id)){
                        return {
                        ...user,
                        follower:true
                        }
                    }
                    return user;
                })
            }
        case SET_MAX_PAGE:
            let maxPagesArr = [];
            for (let i = 1; i <= action.pages; i++) maxPagesArr.push(i);
            return {
                ...state,
                maxPage: maxPagesArr
            }
        case CHANGE_PAGE:
            return {
                ...state,
                pageNow: action.pageNumber
            }
        case PRELOAD:
            return {
                ...state,
                preload: action.preload
            }
        default:
            return state;
    }
};

export default UserReduser;

export const setUsers = (users,frendsRequests) => ({ type: SET_USER, users, frendsRequests})
export const getFollower = (userId) => ({ type: FOLLOW, userId });
export const getUnfollower = (userId) => ({ type: UNFOLLOW, userId});
export const setMaxPages = (pages) => ({ type: SET_MAX_PAGE, pages });
export const changePage = (pageNumber) => ({ type: CHANGE_PAGE, pageNumber });
export const changePreload = (preload) => ({ type: PRELOAD, preload })


export const getUsers = (count, pageNow) => (dispatch) => {
    dispatch(changePreload(true))
    userQure(count, pageNow).then(res => {
        dispatch(changePreload(false))
        dispatch( setUsers(res.users, res.frendsRequests))
        dispatch(setMaxPages(res.maxPage))
    });
}

export const followThunk = (userID) => (dispatch) => {
    queryFollow(userID).then(res =>{ 
        dispatch(getFollower(userID))})
}

export const unfollowThunk = (userID) => (dispatch) => {
    unfollow(userID).then(res =>{ 
        dispatch(getUnfollower(userID))})
}