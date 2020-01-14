const SET_UP_LOAD  = " SET_UP_LOAD";

let Initialization = {
    idProfile:1,
    valueNewFrends:1
}

let ReduserNavBar  = (state=Initialization, action ) => {
   switch (action.type) {
       case SET_UP_LOAD:
          return {...state,
            idProfile:action.idProfile
        }
       default:
          return state;
   }
}

export const setUpLoad = (idProfile)=>({ type:SET_UP_LOAD, idProfile});

export default ReduserNavBar;
