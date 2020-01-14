import { profileQure } from '../API/api';
import { avatarQuery, addMessageWall } from '../API/apiPost';
import { getCurrentDate } from '../funCom/DateFunc';

const CHANGE_TEXT_WALL = "CHANGE-TEXT-WALL";
const ADD_MESSAGE_WALL = "ADD-MESSAGE-WALL";
const GET_PROFILE = "GET_PROFILE";
const SET_AVATAR = 'SET_AVATAR';
const ADD_COUNT_LIKE = 'ADD_COUNT_LIKE'

let initialization = {
    profile:[],
    gallery:[],
    lengthGallery:0,
    printText: "",
    wallMap: [],
    avatar:""
};

const ProfilePagerReduce = (state = initialization, action) => {
    switch (action.type) {
        case ADD_MESSAGE_WALL:
            let date = getCurrentDate();
            state.wallMap.unshift({
                id: ++action.user[0].Gallery.length, 
                avatar: localStorage.getItem("avatar"),
                name:localStorage.getItem("name"),
                idUser: localStorage.getItem("idUser"),
                text: state.printText, 
                time: date,
                countLike:[]
            })
            return ({
                ...state,
                printText: ''
            })
        case CHANGE_TEXT_WALL: {
            let body = action.body.target.value;
            return ({
                ...state,
                printText:body
            });
        }
        case GET_PROFILE: {
            return ({
                ...state,
                profile:[...action.profile],
                gallery:[...action.profile[0].Gallery],
                lengthGallery:action.profile[0].Gallery.length,
                wallMap:action.profile[0].Wall,
                avatar: action.profile[0].avatar
            });
        }
        case SET_AVATAR:{
            return({
                ...state,
                avatar: action.newAvatar
            })
        }
        case ADD_COUNT_LIKE: {
            let idCount = String("id" + localStorage.getItem("idUser"));
            return ({
                ...state,
                wallMap: state.wallMap.map(item => {
                    if (item.id === action.sms.id) {
                        let indexLike = item.countLike.indexOf(idCount);
                        let arrCountLike = [...item.countLike, idCount];
                        if (indexLike > -1) {
                            item.countLike.splice(indexLike, 1)
                            arrCountLike = item.countLike
                        }
                        return {
                            ...item,
                            countLike: arrCountLike
                        }
                    }
                    return { ...item }
                })
            })
        }
        default:
            return state;
    }
};

export default ProfilePagerReduce;

export const createObjectChangeWall = (body) => ({ type: CHANGE_TEXT_WALL, body});
export const createAddMessageWall = (user) => ({ type: ADD_MESSAGE_WALL, user});
export const setProfile = (profile) => ({ type: GET_PROFILE,  profile });
export const setAvatar = (newAvatar) => ({ type:SET_AVATAR, newAvatar});
export const addLike = (sms) => ({type:ADD_COUNT_LIKE, sms});

export const getProfile = (userId) => (dispatch) => {
    profileQure(userId).then(res => {
        dispatch (setProfile(res))})
}

export const setAvatarServer = (files) => (dispatch) => {
    let F = files.base64.replace(/^data:image\/\w+;base64,/, "");
    avatarQuery({file: F}).then( res => {
    dispatch(getProfile(res));
    })
}

export const addMessagesServer = (textPrint, user) => (dispatch) => {
    let date = getCurrentDate();
    let message = {userId:user[0].id, message:textPrint, time:date};
     addMessageWall(message).then(res=>
       { 
         dispatch(createAddMessageWall(user))}
    )
}