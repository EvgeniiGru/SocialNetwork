import { questionSession } from "../API/api";

const SET_AU= "SET_AU";

let InitializationDialog = {
    isAU: false
};

const appAU = (state = InitializationDialog, action) => {
    switch (action.type) {
        case SET_AU:
            {
                return ({
                    ...state,
                    isAU: action.isAu
                })
            }
        default:
            return state;
    }
};

export default appAU;

export const setAU = (isAu) => ({ type: SET_AU, isAu});
export const getAU = () => (dispatch) => {
    questionSession().then(res => {
        dispatch(setAU(res.AU));
      })
}

