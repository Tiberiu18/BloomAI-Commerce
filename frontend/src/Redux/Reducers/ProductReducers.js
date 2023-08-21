import { PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../Constants/ProductConstants";
import { PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS } from "../Constants/ProductConstants";
import { PRODUCT_SUGGESTION_FAIL, PRODUCT_SUGGESTION_REQUEST, PRODUCT_SUGGESTION_SUCCESS } from "../Constants/ProductConstants";
import { PRODUCT_CREATE_REVIEW_FAIL, PRODUCT_CREATE_REVIEW_REQUEST, PRODUCT_CREATE_REVIEW_RESET, PRODUCT_CREATE_REVIEW_SUCCESS } from "../Constants/ProductConstants";
// prod list reducer
export const productListReducer = (state = {products: []}, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return {loading: true, products: []};
        case PRODUCT_LIST_SUCCESS:
            return {loading: false, pages:action.payload.pages, page:action.payload.page,
                products: action.payload.products};
        case PRODUCT_LIST_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

// PRODUCT DETAIL REDUCER
export const productDetailsReducer = (state = {product: {reviews:[]}}, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {...state, loading: true};
        case PRODUCT_DETAILS_SUCCESS:
            return {loading: false, product: action.payload};
        case PRODUCT_DETAILS_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}


// suggested products reducer
export const suggestedProductsReducer = (state = {products: []}, action) => {
    switch (action.type) {
        case PRODUCT_SUGGESTION_REQUEST:
            return {loading: true, products: []};
        case PRODUCT_SUGGESTION_SUCCESS:
            return {loading: false, products: action.payload};
        case PRODUCT_SUGGESTION_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}


// PRODUCT REVIEW REDUCER
export const productReviewCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_CREATE_REVIEW_REQUEST:
            return {loading: true};
        case PRODUCT_CREATE_REVIEW_SUCCESS:
            return {loading: false, success: true};
        case PRODUCT_CREATE_REVIEW_FAIL:
            return {loading: false, error: action.payload};
        case PRODUCT_CREATE_REVIEW_RESET:
            return {};
        default:
            return state;
    }
}


