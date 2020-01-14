import {createStore, combineReducers, applyMiddleware} from "redux";
import ProfilePagerReduce from "./ProfilePageReduce";
import MessagedialogReduce from "./MessageDialogReduce";
import GalleryReducer from "./GalleryReduce";
import UserReduser from "./UsersReduser";
import AU from "./AU";
import appAU from "./AppaState"
import FrendReduser from "./FrendReduser";
import thunkMiddleware from "redux-thunk"
import ReduserNavBar from "./NavBarRedus";


let reducers = combineReducers({
    navBar: ReduserNavBar,
    appState:appAU,
    authentication:AU,
    profilePage:ProfilePagerReduce,
    dialogs:MessagedialogReduce,
    imgGallery:GalleryReducer,
    users:UserReduser,
    frends:FrendReduser
});

const store = createStore(reducers,applyMiddleware(thunkMiddleware));

export default store;