import { SET_ALERT, REMOVE_ALERT } from "./types"
// import uuid from "uuid"
import { v4 as uuid } from "uuid";



// const setAlert = (msg, alertType) => dispatch => {
const setAlert = (msg, alertType, timeout = 5000) => dispatch => {

    // const id = uuid.v4();
    const id = uuid();
    dispatch({
        type: SET_ALERT,
        payload: { msg, alertType, id }
    });

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);


}


export default setAlert;