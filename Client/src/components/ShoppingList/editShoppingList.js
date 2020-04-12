import React, { Component } from 'react'
import Axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class editShoppingList extends Component {
    constructor(props){
        super(props);

        this.state = {
            listName: '',
            description: '',
            dietType: '',
            dateCreated: '',
            data: []
        }
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeListName = this.onChangeListName.bind(this);
        this.onChangeDietType = this.onChangeDietType.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this);
    }

    componentDidMount() {
        Axios.get('http://localhost:5000/shoplist/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    listName: response.data.listName,
                    description: response.data.description,
                    dietType: response.data.dietType,
                    dateCreated: new Date(response.data.dateCreated)
                })})
                .catch(error => console.log("Error", error));
    }

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

        const updatedList = {
            listName: this.state.listName,
            description: this.state.description,
            dateCreated: this.state.dateCreated,
            dietType: this.state.dietType
        }

        Axios.patch('http://localhost:5000/shoplist/'+this.props.match.params.id, updatedList)
            .then(res => console.log("List updated ",res.data),
                this.props.history.push("/savedRecipesList"));
        
        this.setState({
            listName: '',
            description: '',
            dietType: '',
            dateCreated: new Date()

        })
    }
    render() {
        return (
            <div className="container">
            <ol className="breadcrumb" style={{marginTop:100}}>
                <li className="breadcrumb-item active"><strong>Update a Recipe List</strong></li>
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
                                        dateFormat="dd/MM/yyyy"
                                        onChange={this.onChangeDate}
                                    />
                                </div>
                        </div>
                        <div className="form-group">
                        <input type="submit" value="Update List" className="btn btn-primary" />
                    </div>
                    </form>
                    
                </div>
                
            </div>
        )
    }
}
