import {configureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import {productListReducer, productReviewCreateReducer, suggestedProductsReducer} from './Reducers/ProductReducers';
import {productDetailsReducer} from './Reducers/ProductReducers';
import {cartReducer} from './Reducers/CartReducers';
import {userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateReducer} from './Reducers/userReducers';
import { orderCreateReducer, orderDetailsReducer, orderListReducer, orderPayReducer } from './Reducers/OrderReducers';
import { categoryFilterReducer, priceFilterReducer } from './Reducers/FilterReducers';


const cartItemsFromLocalStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];

// login
const userInfoFromLocalStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;


// shipping address
const shippingAddress = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {};

// payment method

const paymentMethodFromLocalStorage = localStorage.getItem('paymentMethod') ? JSON.parse(localStorage.getItem('paymentMethod')) : {};

const initialState = {
    cart:{
        cartItems: cartItemsFromLocalStorage,
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethodFromLocalStorage,
    },
    userLogin: {
        userInfo: userInfoFromLocalStorage,
    },
};




const store = configureStore({
    reducer: {
        productList: productListReducer,
        productDetails: productDetailsReducer,
        productReviewCreate: productReviewCreateReducer,
        cart: cartReducer,
        userLogin: userLoginReducer,
        userRegister:userRegisterReducer,
        userDetails: userDetailsReducer,
        userUpdateProfile: userUpdateReducer,
        orderCreate:orderCreateReducer,
        orderDetails: orderDetailsReducer,
        orderPay: orderPayReducer,
        orderList: orderListReducer,
        priceFilter: priceFilterReducer,
        categoryFilter: categoryFilterReducer,
        suggestedProducts: suggestedProductsReducer,
    },
    middleware: [thunk],
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState : initialState,
});





export default store;