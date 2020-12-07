import axios from "axios"
// import { URL } from "../common/commondata"

import {
    GET_PROFILE,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    ACCOUNT_DELETED,
    CLEAR_PROFILE,
    GET_PROFILES,
    GET_REPOS
} from "./types"

const { URL } = require("../common/commondata");



export const getCurrentProfile = () => async dispatch => {

    try {

        const res = await axios.get(URL + "/api/profile/me");
        console.log("Profile Data:", res.data);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })

    } catch (err) {
        // console.log("pf error:", err);
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }

}



///  create or update profile

export const createProfile = (formData, history, edit = false) => async dispatch => {

    try {

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        const res = await axios.post(URL + "/api/profile", formData, config);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })

        alert(edit ? "profile updated" : "profile created", "success")

        if (!edit) {
            history.push("/dashboard");
        }

    } catch (err) {

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })

        console.log(err);

    }

}


///   Add Experience

export const addExperience = (formData, history) => async dispatch => {


    try {

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        const res = await axios.put(URL + "/api/profile/experience", formData, config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        console.log("experience added:", res.data);
        alert("Experience Added", "success");

        history.push("/dashboard");

    } catch (err) {

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })

        console.log(err);

    }


}



///   Add Education

export const addEducation = (formData, history) => async dispatch => {


    try {

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        const res = await axios.put(URL + "/api/profile/education", formData, config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        alert("Education Added", "success");

        history.push("/dashboard");

    } catch (err) {

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })

        console.log("Education errors in adding:", err);

    }

}


/// delete experience 


export const deleteExperience = (id) => async dispatch => {
    try {
        const res = await axios.delete(`${URL}/api/profile/experience/${id}`)

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        alert("Experience Removed", "success")

        // history.push("/dashboard")

    } catch (err) {

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })

        console.log(" errors in deleting experience:", err);

    }

}



/// delete education


export const deleteEducation = (id) => async dispatch => {
    try {
        const res = await axios.delete(`${URL}/api/profile/education/${id}`)

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        alert("Education Removed", "success")

        // history.push("/dashboard")

    } catch (err) {

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });

        console.log(" errors in deleting EDUCATION:", err);

    }

}




/////   DELETE ACCOUNT AND PROFILE

export const deleteAccount = () => async dispatch => {

    if (window.confirm("Are You Sure ? this can not be undone!")) {
        try {
            // const res = await axios.delete(`${URL}/api/profile`);
            await axios.delete(`${URL}/api/profile`);
            dispatch({
                type: ACCOUNT_DELETED,
            })
            dispatch({
                type: CLEAR_PROFILE,
            })
            alert("your account has been permanently deleted");
            // history.push("/dashboard")
        } catch (err) {
            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            })
            console.log(" errors in  DELETE ACCOUNT AND PROFILE:", err);
        }
    }

}


///////////     get all profiles ///////

export const getProfiles = () => async dispatch => {

    dispatch({ type: CLEAR_PROFILE });

    try {

        const res = await axios.get(URL + "/api/profile");
        console.log(" all getProfiles data :", res.data);
        dispatch({
            type: GET_PROFILES,
            payload: res.data
        })

    } catch (err) {
        // console.log("pf error:", err);
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }

}


///////////     get profile by id ///////

export const getProfileById = userId => async dispatch => {


    try {

        // const res = await axios.get(`${URL}/api/profile/user/${userId}`);   //// VIDEO
        const res = await axios.get(`${URL}/api/profile/github/${userId}`);     ///// ARSHAD

        console.log(" get profile by id :", res.data);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })

    } catch (err) {
        // console.log("pf error:", err);
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }

}



///////////     get github repos ///////

export const getGitHubRepos = (username) => async dispatch => {


    try {

        const res = await axios.get(`${URL}/api/profile/github/${username}`);
        console.log(" all getProfiles data :", res.data);
        dispatch({
            type: GET_REPOS,
            payload: res.data
        })

    } catch (err) {
        // console.log("pf error:", err);
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }

}























