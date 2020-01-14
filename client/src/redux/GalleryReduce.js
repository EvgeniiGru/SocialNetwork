import { questionGallery, galleryQuere } from "../API/api";
import { uploadImgServer } from "../API/apiPost";

const SET_GALLERY = 'SET_GALLERY';
const GET_IMG = 'GET_IMG';

let initialization  = {
  gallery:[],
  file:'',
  urlFileName:''
}

const GalleryReducer = (state=initialization, action=true)=>{
  switch (action.type) {
    case GET_IMG:
        return {...state,
          gallery: [...state.gallery,{id:state.gallery.length, src:action.file}]
          } 
    case SET_GALLERY:
      return{
        ...state,
        gallery: action.galleryMap
      }
  
    default:
      return state;
  }
};

export default GalleryReducer;
 
export const setGallery = (galleryMap) => ({type:SET_GALLERY, galleryMap});
export const getImg = (file) => ({type:GET_IMG, file});

export const getGallery = (userId) => (dispatch) => {
  questionGallery(userId).then(res =>{
      dispatch(setGallery(res));
  })
}

export const getImgNow = (files) => {
  let F = files.base64.replace(/^data:image\/\w+;base64,/, "");
  uploadImgServer({file: F}).then(res=> {
   console.log(res)})
}
