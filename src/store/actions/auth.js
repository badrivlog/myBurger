import * as actionTypes from './actionsTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
};

export const authSuccess = (idToken, localId, expiresIn) =>{
    return{
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        localId: localId,
        expiresIn: expiresIn
    }
};

export const authFail = erorr => {
    return{
        type: actionTypes.AUTH_FAIL,
        error: erorr
    }
};

export const auth = (email, password, isSignUp) => {
    console.log(email, password);
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA1ajgKrOQJb_sswhR10lrliW3S4AI1IQQ';
        if(!isSignUp){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA1ajgKrOQJb_sswhR10lrliW3S4AI1IQQ';
        };
        axios.post(url, authData)
        .then(response =>{
            console.log(response);
            dispatch(authSuccess(response.data.idToken, response.data.localId, response.data.expiresIn))
        })
        .catch(err => {
            console.log(err);
            dispatch(authFail(err))
        })
    }
};