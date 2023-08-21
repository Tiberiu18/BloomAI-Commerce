import { SET_MAX_PRICE, SET_MIN_PRICE, SET_CATEGORY_FILTER } from "../Constants/FilterConstants";

// Price Actions
export const setMinPrice = (price) => {
    return {
        type: SET_MIN_PRICE,
        payload: price,
    };
};


export const setMaxPrice = (price) => {
    return {
        type: SET_MAX_PRICE,
        payload: price,
    };
};

// Category Actions
export const setCategoryFilter = (category) => {
    return {
        type: SET_CATEGORY_FILTER,
        payload: category,
    };
}