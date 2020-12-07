import React, { Fragment, useState } from 'react'
import { Link, Redirect } from 'react-router-dom';
// import axios from 'axios';
import { connect } from "react-redux"
import { login } from "../../actions/auth"
import PropTypes from 'prop-types';


const LogIn = ({ login, isAuthenticated }) => {
    console.log(isAuthenticated);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const { email, password } = formData;

    const onChange = (e) => setFormData({
        ...formData,  //// ?
        [e.target.name]: e.target.value
    });

    // const onSubmit = async (e) => {
    const onSubmit = (e) => {
        e.preventDefault();
        login(email, password);
        // console.log("Success");
    }

    if (isAuthenticated) {
        return <Redirect to="/dashboard" />
    }

    return <Fragment>
        <h1 className="large text-primary">Log In</h1>
        <p className="lead"><i className="fas fa-user"></i> LogIn To Your Account</p>
        <form className="form" onSubmit={e => onSubmit(e)}>
            <div className="form-group">
                <input type="email"
                    placeholder="Email Address"
                    name="email"
                    value={email}
                    required
                    onChange={(e) => onChange(e)}
                />
            </div>
            <div className="form-group">
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    minLength="6"
                    value={password}
                    required
                    onChange={(e) => onChange(e)}
                />
            </div>
            <input type="submit" className="btn btn-primary" value="LogIn" />
        </form>
        <p className="my-1">
            Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
    </Fragment>
}

LogIn.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
}


const mapStateToProps = (state) => ({
    
    // auth: state.user,
    isAuthenticated: state.authReducer.isAuthenticated
    // isAuthenticated: state
});



export default connect(mapStateToProps, { login })(LogIn);



