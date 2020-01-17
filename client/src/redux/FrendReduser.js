import { frendsQureGet } from "../API/api";
import { frendsQurePost } from "../API/apiPost";
import { frendsQureDelete, unfollow, mayBeFrendDel } from "../API/apiDel";

const SET_FRENDS = "SET_FRENDS";
const SET_MAY_BE_FRENDS = "SET_MAY_BE_FRENDS"
const SET_MAX_PAGE_FRENDS = "SET_MAX_PAGE_FRENDS";
const SET_MAX_PAGE_MAY_BE_FRENDS = "SET_MAX_PAGE_MAY_BE_FRENDS";
const CHANGE_PAGE = "CHANGE_PAGE";
const PRELOAD = "PRELOAD";
const CHANGE_CHECK_BOX_VALUE = "CHANGE_CHECK_BOX_VALUE";
const SET_MAX_PAGE_FRENDS_REQUESTS = "SET_MAX_PAGE_FRENDS_REQUESTS";
const SET_FRENDS_REQUESTS = "SET_FRENDS_REQUESTS";

let initialization = {
    frends: [],
    frendsRequests: [],
    maxPageFrendRequests: [],
    maxPageFrend: [],
    pageNow: 1,
    count: 5,
    maxPageMayBeFrends: [],
    preload: true,
    checkBoxValue: 'myFrends'
};

const FrendReduser = (state = initialization, action) => {
    switch (action.type) {
        case SET_FRENDS:
            return {
                ...state,
                frends: [...action.frends]
            }
        case SET_FRENDS_REQUESTS:
            return {
                ...state,
                frendsRequests: [...action.frendsRequests]
            }
        case SET_MAY_BE_FRENDS:
            return {
                ...state,
                mayBeFrends: [...action.mayBeFrends]
            }
        case SET_MAX_PAGE_FRENDS:
            let maxPagesArr = [];
            for (let i = 1; i <= action.pagesFrend; i++) maxPagesArr.push(i);
            return {
                ...state,
                maxPageFrend: maxPagesArr
            }
        case SET_MAX_PAGE_FRENDS_REQUESTS:
            let maxPagesRequestsArr = [];
            for (let i = 1; i <= action.pagesFrend; i++) maxPagesRequestsArr.push(i);
            return {
                ...state,
                maxPageFrendRequests: maxPagesRequestsArr
            }
        case SET_MAX_PAGE_MAY_BE_FRENDS:
            let maxPagesArrMayBeFrend = [];
            for (let i = 1; i <= action.pagesMayBeFrends; i++) maxPagesArrMayBeFrend.push(i);
            return {
                ...state,
                maxPageMayBeFrends: maxPagesArrMayBeFrend
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
        case CHANGE_CHECK_BOX_VALUE:
            let valueCheckBox = action.body.target.value
            return {
                ...state,
                checkBoxValue: valueCheckBox,
                pageNow: 1
            }
        default:
            return state;
    }
};

export default FrendReduser;

export const setFrends = (frends) => ({ type: SET_FRENDS, frends })
export const setFrendsRequests = (frendsRequests) => ({ type: SET_FRENDS_REQUESTS, frendsRequests })
export const setMayBeFrends = (mayBeFrends) => ({ type: SET_MAY_BE_FRENDS, mayBeFrends })
export const setMaxPagesFrends = (pagesFrend) => ({ type: SET_MAX_PAGE_FRENDS, pagesFrend });
export const setMaxPagesFrendsRequests = (pagesFrendsRequests) => ({ type: SET_MAX_PAGE_FRENDS_REQUESTS, pagesFrendsRequests });
export const setMaxPagesMayBeFrends = (pagesMayBeFrends) => ({ type: SET_MAX_PAGE_MAY_BE_FRENDS, pagesMayBeFrends });
export const changePage = (pageNumber) => ({ type: CHANGE_PAGE, pageNumber });
export const changePreload = (preload) => ({ type: PRELOAD, preload });
export const ChangeCheckBoxValue = (body) => ({ type: CHANGE_CHECK_BOX_VALUE, body });


export const getFrends = (count,pageNow) => (dispatch) => {
        dispatch(changePreload(true))
        frendsQureGet(count,pageNow).then(res => {
            dispatch( changePreload(false))
            dispatch ( setFrends(res.frends.users))
            dispatch ( setMayBeFrends(res.mayBeFrends.users))
            dispatch ( setFrendsRequests(res.frendsRequests.users))
            dispatch  (setMaxPagesFrends(res.frends.maxPage))
            dispatch  (setMaxPagesMayBeFrends(res.mayBeFrends.maxPage))
            dispatch (setMaxPagesFrendsRequests(res.frendsRequests.maxPage))
    })
}

export const addFrends = (frendID) => (dispatch) => {
    dispatch(changePreload(true));
    frendsQurePost(frendID).then(res => {
        dispatch( changePreload(false))
        dispatch( changePage(1));
        dispatch( getFrends(5, 1))
    }); 
}

export const delFrends = (frendID) => (dispatch) => {
    dispatch(changePreload(true));
    frendsQureDelete(frendID).then(res => {
        dispatch( changePreload(false))
        dispatch( changePage(1));
        dispatch( getFrends(5, 1))
    }); 
}

export const unfollowFrends = (frendID) => (dispatch) => {
    dispatch(changePreload(true));
    unfollow(frendID).then(res => {
        dispatch( changePreload(false))
        dispatch( changePage(1));
        dispatch( getFrends(5, 1))
    }); 
}

export const wayBeFrendDelet = (frendID) => (dispatch) => {
    dispatch(changePreload(true));
    mayBeFrendDel(frendID).then(res => {
        dispatch( changePreload(false))
        dispatch( changePage(1));
        dispatch( getFrends(5, 1))
    }); 
}
