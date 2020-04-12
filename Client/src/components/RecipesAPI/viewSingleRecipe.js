import React, { Component } from 'react'
import axios from 'axios';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class ViewSingleRecipe extends Component {
    constructor(props) {
        super(props);

        this.state = {
            recipe: []
        }
    }

    componentDidMount() {
        axios.get(`https://recipe-shoplist.herokuapp.com/recipe/${this.props.match.params}`) 
        .then(res => {
            this.setState({
                recipe:res.data.recipe
            })

        })
    }



    render() {

        console.log("Data", this.state.recipe);

        return (
            <div className="container" style={{marginTop: "100px"}}>
                <h3>View Single Recipe</h3>
            </div>
        )
    }
}
ViewSingleRecipe.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(ViewSingleRecipe);