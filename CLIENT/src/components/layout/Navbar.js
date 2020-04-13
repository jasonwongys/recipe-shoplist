import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Navbar extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();

        window.location.replace('/login');

    };
    render() {

        const { user } = this.props.auth;

        return (
            <div className="container-fluid">
                
                <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-primary fixed-top">
                    
                    <Link to="/dashboard" style={{ fontFamily: "monospace" }} className="navbar-brand">
                        <h3 className="text-white justify-content-center" style={{fontFamily:"Lobster, Cursive"}}><i className="fas fa-seedling"></i>Recipe Shopping List</h3>
                    </Link>

                    {/* <div className="text-dark"><strong>Welcome, {this.props.auth.user ? user.name.split(" ")[0] : " "} You are logged in</strong></div>👏 */}

                        <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse " id="navbarResponsive">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <a className="nav-link text-dark" href="/searchRecipes">Search For Recipes</a>
                                </li>
                                
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle text-dark" href="#" id="navbarDropdownPortfolio" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        My Lists
                                </a>
                                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownPortfolio">
                                        <a className="dropdown-item text-dark" href={`/api/users/recipe/${user.id}`}>View Saved Recipes List</a>
                                        <a className="dropdown-item text-dark" href="/shoplist">Generate Shopping List</a>
                            
                                    </div>
                                </li>
                            
                    
                                <li className="nav-item">
                                    <a className="nav-link text-dark" onClick={this.onLogoutClick}>Logout</a>
                                </li>
                            </ul>
                        </div>
                    
                </nav>


            </div>
        );
    }
}
Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Navbar);