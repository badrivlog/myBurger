import * as actionTypes from '../actions/actionsTypes';
import {updatedObject} from '../utility';


const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
};

const INGREDIENT_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const addIngredient = (state, action) => {
    const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1};
    const updatedIngredients = updatedObject(state.ingredients, updatedIngredient);
    const updatedStat = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName], 
    }
    return updatedObject(state, updatedStat);
};

const removeIngredient = (state, action) => {
    const updatedIng = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1};
    const updateIngred = updatedObject(state.ingredients, updatedIng);
    const updatedState = {
        ingredients: updateIngred,
        totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredientName], 
    };
    return updatedObject(state, updatedState)
};

const setIngredient = (state, action) => {
    return updatedObject(state, {
        ingredients: {
            salad: action.ingredients.salad,
            cheese: action.ingredients.cheese,
            bacon: action.ingredients.bacon,
            meat: action.ingredients.meat
        }
    });
};
const fetchIngredientFail = state => {
    return updatedObject(state, {error: true})
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
            case actionTypes.SET_INGREDIENT: return setIngredient(state, action);
            case actionTypes.FETCH_INGREDIENT_FAIL: return fetchIngredientFail(state);
        default: 
        return state;
    }
}; 

export default reducer;