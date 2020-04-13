import React, { Component } from 'react'
import Axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class createShoppingList extends Component {
    constructor(props){
        super(props);

        this.state = {
            listName: '',
            description: '',
            dietType: '',
            dateCreated: ''
        }
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeListName = this.onChangeListName.bind(this);
        this.onChangeDietType = this.onChangeDietType.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this);
        this.onLogoutClick = this.onLogoutClick.bind(this);
    }

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();

        window.location.replace('/login');

    };

    onChangeListName(e) {
        this.setState({
            listName: e.target.value
        })
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeDietType(e) {
        this.setState({
            dietType: e.target.value
        });
    }

    onChangeDate(date) {
        this.setState({
            dateCreated: date
        })
    }

    onSubmitForm(e) {
        e.preventDefault();

        const newList = {
            listName: this.state.listName,
            description: this.state.description,
            dateCreated: this.state.dateCreated,
            dietType: this.state.dietType
        }

        Axios.post(`http://localhost:5000/api/users/shoplist/${this.props.auth.user.id}`,newList)
            .then(res => console.log("List created ",res.data),
                this.props.history.push("/savedRecipesList"));
        
        this.setState({
            listName: '',
            description: '',
            dietType: '',
            dateCreated: new Date()

        })
    }
    render() {
        console.log("Auth obj",this.props.auth.user.id);
        //const { user } = this.props.auth;

        return (
            <div className="container">
            <ol className="breadcrumb" style={{marginTop:100}}>
                <li className="breadcrumb-item active"><strong>Create a Recipe List</strong></li>
            </ol>
                
                <div style={{margin: "100"}}>
                    <form onSubmit={this.onSubmitForm}>
                        <div className="form-group">
                            <label className="form-check-label">List name</label>
                                <input type="text"
                                    className="form-control"
                                    value={this.state.listName}
                                    onChange={this.onChangeListName}
                                />
                        </div>

                        <div className="form-group">
                            <label className="form-check-label">Description</label>
                                <input type="text"
                                    className="form-control"
                                    value={this.state.description}
                                    onChange={this.onChangeDescription}
                                />
                        </div>

                        <div className="form-group">
                            <label>Diet Type</label>
                                <input type="text"
                                    className="form-control"
                                    value={this.state.dietType}
                                    onChange={this.onChangeDietType}
                                />
                        </div>

                        <div className="form-group">
                            <label>Date Created: </label>
                                <div>
                                    <DatePicker
                                        selected={this.state.dateCreated}
                                        className="form-control"
                                        onChange={this.onChangeDate}
                                    />
                                </div>
                        </div>
                        <div className="form-group">
                        <input type="submit" value="Create List" className="btn btn-primary" />
                    </div>
                    </form>
                    
                </div>
                
            </div>
        )
    }
}
createShoppingList.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(createShoppingList);