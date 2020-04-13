import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import './register.css';
import axios from 'axios'


class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            password2: "",
            errors: {}
        };
    }

    componentDidMount() {

        // If logged in and user navigates to Register page, should redirect them to dashboard
        if(this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };


        axios.post('https://recipe-shoplist.herokuapp.com/api/users/register',newUser)
            .then(response => console.log(response.data),
            this.props.registerUser(newUser, this.props.history));

        this.setState({
            name: '',
            email: '',
            password: ''
        })
        
        this.props.registerUser(newUser, this.props.history);
    };

    render() {
        const { errors } = this.state;

        return (
            <div className="container-fluid" id="backgroundImg" style={{height: "100vh"}}>
                <div className="row">
                    <div className="form-group row"  style={{margin: "100px"}}>
                       
                        <div className="card card-signin my-5" style={{ padding: "11.250px",height: "auto"}} >
                            <div className="card-body" style={{padding: "2px"}}>

                            <Link to="/" className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                            <i className="fas fa-backspace"></i> Back to home
                        </Link>
                            <h4 className="card-title text-center">
                                <b>Register</b> below
                                </h4>
                            <p className="grey-text text-darken-1">
                                Already have an account? <Link to="/login">Log in</Link>
                            </p>
                        </div>
                        <form className="form-signin" noValidate onSubmit={this.onSubmit} style={{height: "500px"}}>
                            <div className="form-label-group">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.name}
                                    error={errors.name}
                                    id="name"
                                    type="text"
                                    className={classnames("", {
                                        invalid: errors.name
                                    })}
                                />
                                <label htmlFor="name">Name</label>
                                <span className="red-text">{errors.name}</span>
                            </div>
                            <div className="form-label-group">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.email}
                                    error={errors.email}
                                    id="email"
                                    type="email"
                                    className={classnames("", {
                                        invalid: errors.email
                                    })}
                                />
                                <label htmlFor="email">Email</label>
                                <span className="red-text">{errors.email}</span>
                            </div>
                            <div className="form-label-group">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.password}
                                    error={errors.password}
                                    id="password"
                                    type="password"
                                    className={classnames("", {
                                        invalid: errors.password
                                    })}
                                />
                                <label htmlFor="password">Password</label>
                                <span className="red-text">{errors.password}</span>
                            </div>
                            <div className="form-label-group">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.password2}
                                    error={errors.password2}
                                    id="password2"
                                    type="password"
                                    className={classnames("", {
                                        invalid: errors.password2
                                    })}
                                />
                                <label htmlFor="password2">Confirm Password</label>
                                <span className="red-text">{errors.password2}</span>
                                    <hr />
                                <button
                                    type="submit"
                                    className="btn btn-lg btn-primary btn-block text-uppercase"
                                    
                                >Sign up</button>
                            </div>
                            {/* <div className="row" style={{ padding: "11.250px" }}> */}
                                
                                    
                
                            {/* </div> */}
                            
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

//mapStateToProps allows us to get our state from Redux and 
// map it to props which we can use inside components.

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})



export default connect(
    mapStateToProps,
    { registerUser }
)(withRouter(Register));