import * as axios from 'axios'

const instance = axios.create({
    withCredentials:true,
    baseURL:"http://localhost:3000"
})

export const qureAU = (mail, password) => {
  return  instance.get(`/authentication?mail=${mail}&password=${password}`).then(res => res.data)
}

export const profileQure = (userId) => {
    return  instance.get(`/profile/id${userId}`).then(res => res.data)
}

export const userQure = (count, page) => {
    return  instance.get(`/users?count=${count}&page=${page}`).then(res => res.data)
}

export const frendsQureGet = (count, page) => {
    return  instance.get(`/frends?count=${count}&page=${page}`).then(res => res.data)
}

export const questionSession = () =>{
    return instance.get(`/session`).then(res => res.data);
}

export const questionGallery = (userId) =>{
    return instance.get(`/gallery${userId}`).then(res => res.data);
}
