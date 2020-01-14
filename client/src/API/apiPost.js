import * as axios from 'axios'

const instance = axios.create({
    withCredentials:true,
    baseURL:"http://localhost:3000"
})


export const frendsQurePost = (userID) => {
    return  instance.post(`/frends`,{ userFrendID:userID }).then(res => res.data)
}

export const queryFollow = (userID) => {
    return  instance.post(`/frendsRequests`,{ userFrendID:userID }).then(res => res.data)
}

export const uploadImgServer = (file) => {
    return instance.post ('/gallery', file ).then(res => res.data)
}

export const avatarQuery = (file) => {
    return instance.post ('/avatar', file).then(res => res.data)
}

export const addMessageWall = (file) => {
    return instance.post('profile/wall', file).then(res => res.data)
}

