import axios from "axios"
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_PROFILE
} from "./types"
// import setAlert from "./alert"
import setAuthToken from "../utils/setAuthToken"   //////  what's purpose ???
const { URL } = require("../common/commondata");

///// load user
export const loadUser = () => async dispatch => {

    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get(URL + "/api/auth");
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
        alert("load user successfully")
    } catch (error) {
        alert("not loading user ")
        dispatch({
            type: AUTH_ERROR
        })
    }
}

//// Register User
export const register = ({ name, email, password }) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    }
    const body = JSON.stringify({ name, email, password });
    console.log("body:", body);
    try {
        // const res = await axios.post("http://localhost:3001/api/user", body);
        // const res = await axios.post("http://localhost:3001/api/user", body, config);
        // const res = await axios.post("https://floating-harbor-12898.herokuapp.com/api/user", body, config);
        const res = await axios.post(URL + "/api/user", body, config);

        // console.log("res:", res);
        console.log("res.data:", res.data);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
        alert("register successfully");
        dispatch(loadUser());

    } catch (err) {
        console.log("err:", err);
        alert(" register fail");
        // const errors = err.response.data.errors;  /// not working
        // const errors = err.response.data.error;  
        // const errors = err.response;
        // console.log("errors:", errors);
        // if (errors) {
        // errors.forEach(error => dispatch(setAlert(error.msg, "danger")))
        // errors.forEach(error => dispatch(setAlert(["server request problem"], "danger")))
        // }
        dispatch({
            type: REGISTER_FAIL
        })
    }
}


//// LogIn User
export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    }
    const body = JSON.stringify({ email, password });
    console.log("body:", body);
    try {
        // const res = await axios.post("http://localhost:3001/api/user", body);
        // const res = await axios.post("http://localhost:3001/api/user", body, config);
        // const res = await axios.post("https://floating-harbor-12898.herokuapp.com/api/user", body, config);
        const res = await axios.post(URL + "/api/auth", body, config);

        // console.log("res:", res);
        console.log("res.data:", res.data);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        alert("login succerss");
        dispatch(loadUser());

    } catch (err) {
        alert(" logIn fail");
        console.log("err:", err);

        // const errors = err.response.data.errors;  /// not working
        // const errors = err.response.data.error;  
        // const errors = err.response;
        // console.log("errors:", errors);
        // if (errors) {
        // errors.forEach(error => dispatch(setAlert(error.msg, "danger")))
        // errors.forEach(error => dispatch(setAlert(["server request problem"], "danger")))
        // }
        dispatch({
            type: LOGIN_FAIL
        })
    }
}

///////////     LOGOUT /// CLEAR PROFILE

export const logout = () => dispatch => {
    dispatch({ type: CLEAR_PROFILE });
    dispatch({ type: LOGOUT });
};



// export default register;