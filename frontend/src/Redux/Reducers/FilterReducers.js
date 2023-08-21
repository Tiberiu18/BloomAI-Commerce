import { SET_MAX_PRICE, SET_MIN_PRICE, SET_CATEGORY_FILTER } from "../Constants/FilterConstants";

// Price filter reducer
const initialState = {
    minPrice:0,
    maxPrice:10000,
}

// Price filter 
export const priceFilterReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_MIN_PRICE:
            return {...state, minPrice: action.payload};
        case SET_MAX_PRICE:
            return {...state, maxPrice: action.payload};
        default:
            return state;
    }
};


// Category filter reducer
export const categoryFilterReducer = (state = {categoryFilter:[]}, action) => {
    switch(action.type) {
        case SET_CATEGORY_FILTER:
            return {...state, categoryFilter: action.payload};
        default:
            return state;
    }
}
