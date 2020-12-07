import axios from "axios"
import {
    GET_POSTS,
    POST_ERROR,
    UPDATE_LIKES,
    DELETE_POST,
    ADD_POST,
    GET_POST,
    ADD_COMMENT,
    REMOVE_COMMENT
} from "./types"

const { URL } = require("../common/commondata");


// Get Posts
export const getPosts = () => async dispatch => {

    try {
        const res = await axios.get(URL + "/api/post");
        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
};


// Add Like
export const addLike = id => async dispatch => {

    try {
        // const res = await axios.put(`${URL}/api/posts/like/${id}`);  /// by video
        const res = await axios.put(`${URL}/api/post/like/${id}`);      /// given by Arshad Khan
        dispatch({
            type: UPDATE_LIKES,
            payload: { id, likes: res.data }
        })

        alert("add like successfully")

    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }

};

// remove Like
export const removeLike = id => async dispatch => {

    try {
        const res = await axios.put(`${URL}/api/posts/unlike/${id}`);  /// by video
        // const res = await axios.put(`${URL}/api/post/unlike/${id}`);      /// this api does not give Arshad Khan
        dispatch({
            type: UPDATE_LIKES,
            payload: { id, likes: res.data }
        })

        alert("remove like successfully")

    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }

};


/////////  DELETE_POST

export const deletePost = id => async dispatch => {

    try {
        // const res = await axios.delete(`${URL}/api/posts/${id}`);      ///  by video
        await axios.delete(`${URL}/api/post/${id}`);      ///  give by  Arshad Khan
        dispatch({
            type: DELETE_POST,
            payload: id
        })

        alert("post removed successfully");

    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }

};



///  ADD_POST

export const addPost = formData => async dispatch => {

    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    try {
        // const res = await axios.post(`${URL}/api/posts`, formData, config);      ///  by video
        const res = await axios.post(`${URL}/api/post`, formData, config);      ///  give by  Arshad Khan
        dispatch({
            type: ADD_POST,
            payload: res.data
        })

        alert(" POST created successfully");

    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }

};

///  GET_POST   single post

export const getPost = id => async dispatch => {

    try {
        const res = await axios.get(`${URL}/api/post/${id}`);
        dispatch({
            type: GET_POST,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
};


///  ADD_COMMENT

export const addComment = (postId, formData) => async dispatch => {

    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    try {
        // const res = await axios.post(`${URL}/api/posts/comment/${postId}`, formData, config);      ///  give by  video
        const res = await axios.post(`${URL}/api/post/comment/${postId}`, formData, config);      ///  give by  Arshad Khan
        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        })

        alert(" ADD_COMMENT successfully");

    } catch (err) {
        console.log("ADD_COMMENT time err")
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }

};



///  Delete_COMMENT

export const deletComment = (postId, commentId) => async dispatch => {


    try {
        // const res = await axios.post(`${URL}/api/posts/comment/${id}`, formData, config);      ///  give by  video
        const res = await axios.delete(`${URL}/api/post/${postId}/${commentId}`);      ///  give by  Arshad Khan
        dispatch({
            type: REMOVE_COMMENT,
            payload: commentId
        })

        alert(" COMMENT REMOVED successfully");

    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }

};


