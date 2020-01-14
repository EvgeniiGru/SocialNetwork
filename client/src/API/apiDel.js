import * as axios from 'axios'

const instance = axios.create({
    withCredentials:true,
    baseURL:"http://localhost:3000"
})


export const frendsQureDelete = (userID) => {
    return  instance.post(`/frendsDel`,{userFrendID:userID}).then(res => res.data)
}


export const unfollow = (userID) => {
    return  instance.post(`/frendsRequestsDel`,{userFrendID:userID}).then(res => res.data)
}

export const mayBeFrendDel = (userID) => {
    return  instance.post(`/MayBeFrandDel`,{userFrendID:userID}).then(res => res.data)
}
