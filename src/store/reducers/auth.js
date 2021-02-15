import * as actionTypes from '../actions/actionsTypes';
import {updatedObject} from '../utility';

const initialState = {
    idToken: null,
    localId: null,
    expiresIn: null,
    error: null,
    loading: false
}

const authStart = (state, action) => {
    return updatedObject(state, {loading: true})
};

const authSucces = (state, action) =>{
    return updatedObject(state, {
        idToken: action.idToken,
        localId: action.localId,
        expiresIn: action.expiresIn,
        loading: false
    })
};

const authFail = (state, action) => {
    return updatedObject(state, {
        error: action.error,
        loading: false
    })
};
 const reducer = (state = initialState, action)=>{

    switch(action.type){
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSucces(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        default: return state;
    }

};

export default reducer;