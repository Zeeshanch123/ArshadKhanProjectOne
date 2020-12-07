import React, { Fragment, useState } from 'react'
import { Link, Redirect } from 'react-router-dom';
// import axios from 'axios';
import { connect } from "react-redux";
// import { setAlert } from "../../actions/alert"
import setAlert from "../../actions/alert"
import { register } from "../../actions/auth"
import PropTypes from 'prop-types';


// const Register = (props) => {
const Register = ({ setAlert, register, isAuthenticated }) => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const { name, email, password, confirmPassword } = formData;

    const onChange = (e) => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });

    // const onSubmit = async (e) => {
    const onSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            // alert("pasword doesnot match")
            // props.setAlert("password doesnot match", "danger");
            setAlert("Password Does Not Match", "danger");

        } else {

            register({ name, email, password });
            // console.log(formData)
            // console.log("Success");
            // setAlert("You are Sign Up Successfully", "danger");

            // const newUser = {
            //     name,
            //     email,
            //     password
            // }

            // try {
            //     const config = {
            //         headers: {
            //             "Content-Type": "application/json"
            //         }
            //     }

            //     const body = JSON.stringify(newUser)
            //     const res = await axios.post("/api/users", body, config)
            //     console.log(res.data);
            // } catch (err) {
            //     console.error(err.response.data);
            // }

        }
    }

    if (isAuthenticated) {
        return <Redirect to="/dashboard" />
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input type="text"
                        placeholder="Name"
                        name="name"
                        value={name}
                        // required
                        onChange={(e) => onChange(e)}
                    />
                </div>
                <div className="form-group">
                    <input type="email"
                        placeholder="Email Address"
                        name="email"
                        value={email}
                        // required
                        onChange={(e) => onChange(e)}
                    />
                    <small className="form-text"
                    >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small
                    >
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        // minLength="6"
                        value={password}
                        // required
                        onChange={(e) => onChange(e)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        // minLength="6"
                        value={confirmPassword}
                        onChange={(e) => onChange(e)}
                    // required
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
            <p className="my-1">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
        </Fragment>
    );
};

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
}


const mapStateToProps = (state) => ({
    isAuthenticated: state.authReducer.isAuthenticated
});



export default connect(
    mapStateToProps,
    { setAlert, register }
)(Register);

{/* connect k andr first parametre mapStateToProps hota hai r 2nd mapDispatchToProps hota hai ,
 agr phly mapStateToProps use nhi ho raha to null hogi first value r 2nd me  mapDispatchToProps aa jaye gi ,
 in below we are using actions it is same like mapDispatchToProps  */}



