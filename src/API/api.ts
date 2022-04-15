import axios from "axios";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {'API-KEY': 'cbd9acf4-8319-464c-ad86-78da9599b7b0'}
})


export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get(`users?
        page=${currentPage}count${pageSize}`).then(r => r.data)
    },
    follow(id: number) {
        return instance.post(`follow/${id}`).then(r => r.data)
    },
    unfollow(id: number) {
        return instance.delete(`follow/${id}`).then(r => r.data)
    },
    getProfile(id: string) {
       return instance.get(`profile/${id}`)
    },
}

export const headerAPI = {
    getHeader() {
        return instance.get(`auth/me`)
    },
}
