import * as actionTypes from '../actions/actionsTypes';
import {updatedObject} from '../utility';

const initialState = {
    order: [],
    loading: false
};

const purchaseBurgerStart = (state, action) => {
    return updatedObject(state, {loading: true})
};

const purchaseBurgerSuccess = (state, action)=> {
    const newOrder = {
        ...action.orderData,
        id: action.orderId
    };
    return updatedObject(state, {loading: false, order: state.order.concat(newOrder)});
};

const fetchOrderStart = state => {
    return updatedObject(state, {loading: true})
};
const fetchOrderSuccess = (state, action) => updatedObject(state, {loading: false, order: action.order})
const fetchOrderFail = state => updatedObject(state, {loading: false});
const purchaseBurgerFail = state => updatedObject(state, {loading: false});
 

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_BURGER_SUCCESS: purchaseBurgerSuccess(state, action);
        case actionTypes.PURCHASE_BURGER_FAIL: return purchaseBurgerFail(state);
        case actionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state, action);
        case actionTypes.FETCH_ORDER_START: return fetchOrderStart(state);
        case actionTypes.FETCH_ORDER_SUCCESS: return fetchOrderSuccess(state, action); 
        case actionTypes.FETCH_ORDER_FAIL: return fetchOrderFail(state);
    };
    return state
}; 

export default reducer;