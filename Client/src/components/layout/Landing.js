import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./landing.css";

class Landing extends Component {
    render() {
        return (
            <div
                style={{ height: "100vh" }}
                className="container-fluid"
                id="backgroundImg"
            >
                <div className="row">
                    <div class="jumbotron" style={{ margin: "100px" }}>
                        <div className="container">
                            <h1 class="display-4">Hello, Foodies!</h1>
                            <p class="lead" id="heading">
                                "Introducing a recipe search application that converts your recipes into your personal
                                ingredients shopping list"
            </p>
                            <hr class="my-4" />
                            <p>
                                Start searching by registering with us or login if you are one of our members
            </p>
                            <p class="lead">


                            <div className="row align-self-center">
                                <Link
                                    to="/register"
                                    style={{
                                        width: "140px",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px",
                                        margin: "5px"

                                    }}
                                    className="btn btn-primary"
                                >
                                    Register{" "}
                                </Link>
                                <Link
                                    to="/login"
                                    style={{
                                        width: "140px",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px",
                                        margin: "5px"
                                    }}
                                    className="btn btn-primary"
                                >
                                    Log In
                </Link></div>

                            </p>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}
export default Landing;
