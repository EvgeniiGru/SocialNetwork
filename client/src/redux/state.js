import ProfilePagerReduce from "./ProfilePageReduce";
import MessagedialogReduce from "./MessageDialogReduce";

let store = {
    _users: [
        {
            id: "00000001",
            avatar: "https://i.pinimg.com/474x/7b/7e/57/7b7e57aa348a6bc14f9c01de182bc445.jpg",
            name: "Jack Pumpkin"
        },
        {
            id: "00000002",
            avatar: "https://i.pinimg.com/originals/f0/9f/c8/f09fc892d35250c8faffaa43678ee829.jpg",
            name: "Vich Rich"
        }
    ],
    state:{
        profilePage: {
            printText: "",
            WallMap:[
                { id: "00000002", text: "Lol, you pamping", time: "10:54", countLike: 0 },
                { id: "00000002", text: "Lol, you pamping", time: "10:54", countLike: 0 }
            ],
            GalleryMap: [
                { id: 1, src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFtMgEKsqLMbY_BBMJdzjL0K4A5gegz1GrrlZwRqUuB5aQj6l_" },
                { id: 2, src: "https://sun9-56.userapi.com/c837728/v837728709/55917/4-HEc2TAsrY.jpg?ava=1" },
                { id: 3, src: "http://gogallery.ru/data/media/209/11728-halloween-1920x1080-holiday-wallpaper.jpg" },
                { id: 4, src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQxCB0DiwOougroN0xZqxrxG2yFqqKmt8vbAShvVy-b78sb9I9" },
                { id: 5, src: "http://i72.beon.ru/25/26/2192625/98/108963298/3xH0Sif0ow4.jpeg" },
                { id: 6, src: "https://99px.ru/sstorage/53/2018/10/tmb_239966_430558.jpg" },
                { id: 7, src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-ZoAp12tSDeUEiy3yuz3exFh2vzt8sN9pOGcx1biibqsXQjhh" },
                { id: 8, src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTVbcI5ZIxi1j8q6h37aOEF0TIqKMPQvK8_SofLgyrms2O_Snd" }
            ]
        },
        dialogs:{
            printDialogText: "",
            dialogMap:[{id:"00000002"}],
            messagesMap:[
                { id: "00000002", text: "Hello. How are you?", time: "13:03" },
                { id: "00000001", text: "Yo.Super.U?", time: "13:05" }
            ],
        }
    },
    getState(){return this.state},
   
    dispatch(action) {
        this.state.profilePage = ProfilePagerReduce(this.state.profilePage, action);
        this.state.dialogs= MessagedialogReduce(this.state.dialogs,action)
        store._Refresh(store);
    },


 
  
    getUsers() { return this._users },
    getUserById(idUser) {
        let idU = idUser;
        let search = this._users.filter(user => user.id === idU);
        return search[0]
    },
    _Refresh() { },
    subscribe(observer) {
        this._Refresh = observer;
    }

}

export default store;
window.store = store;
