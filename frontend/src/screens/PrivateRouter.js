import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PrivateRouter({component:Component, ...rest}) {

    return (
        <Route
            {...rest}
            component={(props) =>{
                const userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
                const token = userInfo ? userInfo.token : null;
                if (token){
                    return <Component {...props}/>;
                }
                else{
                    return <Redirect to="/login"/>;
                }
            }}
            />
    );
        }
    export default PrivateRouter;