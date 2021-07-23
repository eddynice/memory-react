import { AUTH, LOGOUT } from "../constant/actiontype";

import * as api from "../api";

export const signIn = (formDat, history) => async(dispatch) => {
    try {
        const { data } = await api.signin(formDat);
        console.log(data)
        dispatch({ type: AUTH, data })
        history.push('/')

    } catch (error) {
        console.log(error)

    }
}



export const signUp = (formDat, history) => async(dispatch) => {
    try {
        const { data } = await api.signup(formDat);
        dispatch({ type: AUTH, data })
        console.log(data)

        history.push('/')

    } catch (error) {
        console.log(error)

    }
}