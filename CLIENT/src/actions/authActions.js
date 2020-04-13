import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import {
    GET_ERRORS,
    SET_CURRENT_USER,
    USER_LOADING
} from './types';


// register a user
export const registerUser = (userData, history) => dispatch => {
    axios
        .post("/api/users/register", userData)
        .then(res => history.push("/login")) //redirect to login on usccessful register
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }));
};

// Login - get use token

export const loginUser = userData => dispatch => {
    axios
        .post("/api/users/login", userData)
        .then(res=> {
            //save to localStorage

            //set token to local Storage
            const { token } = res.data;
            localStorage.setItem("jwtToken", token);
            // set token to auth header
            setAuthToken(token);
            //decode token to get user data
            const decoded = jwt_decode(token);
            //set current user
            dispatch(setCurrentUser(decoded));

        })
        .catch(err=> 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }));
}

// set logged in user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

//user loading
export const setUserLoading = () => {
    return {
        type: USER_LOADING
    };
};

//Log user out
export const logoutUser = () => dispatch => {
    // remove tokem from local storage
    localStorage.removeItem("jwtToken");
    // remove auth header from future requests
    setAuthToken(false);

    //set current user to empty object which set isAuth to false
    dispatch(setCurrentUser({}));
}