import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import './login.css';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            id: "",
            email: "",
            password: "",
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
        if(nextProps.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
            // push user to dashboard when they login
        }
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

        const userData = {
            id: this.state.id,
            email: this.state.email,
            password: this.state.password
        };
        console.log(userData);

        this.props.loginUser(userData);
    };

    render() {
        const { errors } = this.state;
        return (
            <div className="container-fluid" id="backgroundImg" style={{height: "100vh"}}>
                <div className="row">
                    <div className="form-group row" style={{margin: "100px"}}>
                        
                        
                        <div className="card card-signin" style={{ padding: "11.250px",height: "auto"}}>
                        <div className="card-body">
                        <Link to="/" className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <i className="fas fa-backspace"></i> Back to home</Link>
                            <h4 className="card-title text-center"><b>Login</b> below</h4>
                            
                            <p className="grey-text text-darken" style={{paddingBottom: "10px"}}>
                                Don't have an account? <Link to="/register">Register</Link>
                            </p>
                            
                        </div>
                        <form className="form-signin" noValidate onSubmit={this.onSubmit}>
                            <div className="form-label-group">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.email}
                                    error={errors.email}
                                    id="email"
                                    className={classnames("", {
                                        invalid: errors.email || errors.emailnotfound
                                    })}
                                    type="email"
                                    placeholder="Email address"
                                    required autoFocus
                                />
                                <label htmlFor="email">Email</label>
                                <span className="red-text">
                                    {errors.email}
                                    {errors.emailnotfound}
                                </span>
                            </div>
                            <div className="form-label-group">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.password}
                                    error={errors.password}
                                    id="password"
                                    className={classnames("", {
                                        invalid: errors.password || errors.passwordincorrect
                                        })}
                                    type="password"
                                    placeholder="Password"
                                    required
                                />
                                <label htmlFor="password">Password</label>
                                <span className="red-text">
                                    {errors.password}
                                    {errors.passwordincorrect}
                                </span>
                            </div>
                            <div className="custom-control custom-checkbox mb-3">
                <input type="checkbox" className="custom-control-input" id="customCheck1"/>
                <label className="custom-control-label" for="customCheck1">Remember password</label>
                </div>
                    <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign in</button>
                    <hr className="my-4"/>

                    <div className="row text-white">
                    <h5>Test account:</h5>
                    <p>ID: jason@gmail.com  </p>
                    <p>Password: 111111</p> 

                    </div>
                    
                    
                </form>
                
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { loginUser }
)(Login);