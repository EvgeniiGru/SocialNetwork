const CHANGE_MAIL_TEXT = "CHANGE_MAIL_TEXT";
const CHANGE_PASSWORD_TEXT = "CHANGE_PASSWORD_TEXT";
const CHANGE_LOG = "CHANGE_LOG";
const CHANGE_REG = "CHANGE_REG";
const SET_ITEMS_LOCAL_STORAGE = "SET_ITEMS_LOCAL_STORAGE";

let InitializationDialog = {
    mail: '',
    password: '',
    isLog: false
};

const AU = (state = InitializationDialog, action) => {
    switch (action.type) {
        case CHANGE_MAIL_TEXT:
            {
                let mail = action.mail.target.value;
                return ({
                    ...state,
                    mail: mail
                })
            }
        case CHANGE_PASSWORD_TEXT:
            {
                let password = action.password.target.value;
                return ({
                    ...state,
                    password: password
                })
            }
        case CHANGE_LOG:
            {
                return ({
                    ...state,
                    isLog: true
                })
            }
        case CHANGE_REG:
            {
                return ({
                    ...state,
                    isLog: false
                })
            }
        case SET_ITEMS_LOCAL_STORAGE:
            if (action.user != undefined) {
                for (let [key, value] of Object.entries(action.user)) {
                    localStorage.setItem(String(key), value)
                }
            }
            return state;
        default:
            return state;
    }
};

export default AU;

export const ChangeMail = (mail) => ({ type: CHANGE_MAIL_TEXT, mail });
export const ChangePassword = (password) => ({ type: CHANGE_PASSWORD_TEXT, password });
export const ChangeLog = () => ({ type: CHANGE_LOG });
export const ChangeReg = () => ({ type: CHANGE_REG });

export const setLocalStorage = (user) => ({ type: SET_ITEMS_LOCAL_STORAGE, user });