const CHANGE_TEXT_DIALOG = "CHANGE-TEXT-DIALOG";
const ADD_MESSAGE_DIALOG = "ADD-MESSAGE-DIALOG";

let InitializationDialog = {
    printDialogText: "",
    dialogMap: [{ id: "00000002" }],
    messagesMap: [
        { id: 1, idUser: "00000002", text: "Hello. How are you?", time: "13:03" },
        { id: 2, idUser: "00000001", text: "Yo.Super.U?", time: "13:05" }
    ],
};

const MessagedialogReduce = (state = InitializationDialog, action) => {

    switch (action.type) {
        case ADD_MESSAGE_DIALOG:
            let DateNow = new Date();
            let data = DateNow.getHours() + ":" + DateNow.getMinutes();
            return ({
                ...state,
                printDialogText: "",
                messagesMap: [...state.messagesMap,
                {
                    id:++state.messagesMap.length,
                    idUser: "00000001",
                    text: state.printDialogText, 
                    time: data,
                    countLike: 0
                }]
            })
        case CHANGE_TEXT_DIALOG:
            return ({
                ...state,
                printDialogText: action.text
            })

        default:
            return state;
    }

};

export default MessagedialogReduce;
export const createObjectChangeMessage = (text) => ({ type: CHANGE_TEXT_DIALOG, text: text });
export const createAddMessage = () => ({ type: ADD_MESSAGE_DIALOG });