import axios from 'axios';
import { logout } from './userActions';
import { PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from '../Constants/ProductConstants';
import { PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS } from '../Constants/ProductConstants';
import { PRODUCT_SUGGESTION_FAIL, PRODUCT_SUGGESTION_REQUEST, PRODUCT_SUGGESTION_SUCCESS } from '../Constants/ProductConstants';
import { PRODUCT_CREATE_REVIEW_FAIL, PRODUCT_CREATE_REVIEW_REQUEST, PRODUCT_CREATE_REVIEW_RESET, PRODUCT_CREATE_REVIEW_SUCCESS } from '../Constants/ProductConstants';
// prod list reducer
export const listProducts = (keyword="", pageNumber= " ") => async (dispatch, getState) => {
    try {
        dispatch({type: PRODUCT_LIST_REQUEST});
        const {minPrice, maxPrice} = getState().priceFilter;
        const {categoryFilter} = getState().categoryFilter;
        let response = await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}&minPrice=${minPrice}&maxPrice=${maxPrice}&categoryFilter=${categoryFilter}`);
        const data = response.data;
        dispatch({type: PRODUCT_LIST_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: PRODUCT_LIST_FAIL, payload:error.response && error.response.data.message ? error.response.data.message : error.message});
    }
}

// single prod detail reducer
export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_DETAILS_REQUEST});
        const {data} = await axios.get(`/api/products/${id}`);
        dispatch({type: PRODUCT_DETAILS_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: PRODUCT_DETAILS_FAIL, payload:error.response && error.response.data.message ? error.response.data.message : error.message});
    }
}

// suggested products reducer
export const listSuggestedProducts = (userId) => async (dispatch,getState) => {
    try {
        dispatch({type: PRODUCT_SUGGESTION_REQUEST});
        const {userInfo} = getState().userLogin;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        };
        const {data} = await axios.get(`/api/ai/recommend/${userId}`,config);
        dispatch({type: PRODUCT_SUGGESTION_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: PRODUCT_SUGGESTION_FAIL, payload:error.response && error.response.data.message ? error.response.data.message : error.message});
    }
}


// PRODUCT REVIEW REDUCER
export const createProductReview = (productId, review) => async (dispatch, getState) => {
    try {
        dispatch({type: PRODUCT_CREATE_REVIEW_REQUEST});
        const {userInfo} = getState().userLogin;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        await axios.post(`/api/products/${productId}/review`, review, config);
        dispatch({type: PRODUCT_CREATE_REVIEW_SUCCESS});
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        if(message === "Not authorized, token failed"){
            dispatch(logout());
        }
        dispatch({type: PRODUCT_CREATE_REVIEW_FAIL, payload:error.response && error.response.data.message ? error.response.data.message : error.message});
    }
}