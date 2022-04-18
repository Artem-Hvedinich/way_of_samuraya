import {authAPI} from "../API/api";
import {stopSubmit} from "redux-form";
import {Dispatch} from "redux";

// export type AuthLoginType = {
//     resultCode: string
//     messages: string[]
//     data: {
//         userId: number
//     }
// }

export type DataType = {
    id: number
    email: string
    login: string
    isAuth: boolean
}

let initialState: DataType = {
    id: 0,
    email: '',
    login: '',
    isAuth: false,
}

export const authReducer = (state = initialState, action: setUserDataType) => {
    switch (action.type) {
        case 'SET_USER_DATA': {
            return {
                ...state, ...action.payload
            }
        }
    }
    return state
}


type setUserDataType = ReturnType<typeof setUserData>
export const setUserData = (id: number, email: string, login: string, isAuth: boolean) => ({
    type: 'SET_USER_DATA', payload: {id, email, login, isAuth},
} as const)

export const getAuthUserData = () =>
    (dispatch: Dispatch) => {
        return authAPI.me()
            .then(res => {
                if (res.data.resultCode === 0) {
                    let {id, email, login} = res.data.data
                    dispatch(setUserData(id, email, login, true))
                }
            })
    }

export const login = (email: string, password: string, rememberMe: boolean) =>
    (dispatch: any) => {
        authAPI.login(email, password, rememberMe)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(getAuthUserData())
                } else {
                    console.log(res.data)
                    const message = res.data.messages.length > 0 ? res.data.messages[0] : 'Some error'
                    dispatch(stopSubmit('login', {_error: message}))
                }
            })
    }

export const logout = () =>
    (dispatch: Dispatch) => {
        authAPI.logout()
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(setUserData(0, '', '', false))
                }
            })
    }