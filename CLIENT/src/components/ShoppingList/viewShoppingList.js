import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Axios from 'axios';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

const ShoppingList = props => (
    
    <tr>
        <td className="text-dark">{props.items.recipeName}</td>
        
        <td className="text-dark">{props.ingredients.name} <img src={`https://spoonacular.com/cdn/ingredients_100x100/${props.ingredients.image}`}/></td>
        <td className="text-dark">{props.ingredients.amount} {props.ingredients.unit}</td>
        <td className="text-dark"><button onClick={()=> props.deleteItem(props.ingredients.id,props.ingredients)} className="btn btn-danger">Delete Item</button></td>
    </tr>

)

class ViewShoppingList extends Component {
    constructor(props) {
        super(props);

        this.state = {

            recipes: [],
            ingredients: [],
            userid: ''

        }

        this.deleteItem = this.deleteItem.bind(this);

    }
    deleteItem(id,data) {

        console.log("Data", data);
        console.log("ID is clicked",id)
    }

    componentDidMount() {

        Axios.get(`https://recipe-shoplist.herokuapp.com/recipes/`)
            .then(res => {
                this.setState({
                    recipes: res.data,
                    ingredients: res.data.map(i => i.ingredients),
                    userid: this.props.auth.user.id
                })
            })

    }



    render() {

        console.log("Ingredient", [...this.state.ingredients])
        console.log("Recipes", this.state.recipes)
        console.log("UseriD", this.state.userid)


        //Retrieve all user saved recipes 
        let filterUser = this.state.recipes.filter((i) => {
            if (i.userid === this.state.userid) {
                
                return i.ingredients
            }
            
        })

        console.log("Filter user", filterUser);

        let filter = filterUser.map(i => {
                i.ingredients.map(j => {
                    if(j.name === "water"){
                        return <li>{j}</li>
                    }
                }
                )});

            console.log("Filter water", filter);

        let filterIngredients = filterUser.map(i =>  
            i.ingredients.map(element => {
                
                
                return <ShoppingList key={element.id}
                                    ingredients={element}
                                        items={i}
                                        deleteItem={this.deleteItem}
                    /> 
            }
        ));

        // let filterIngredients = filterUser.map(i =>  
        //     i.ingredients.map(element => 
        //         element.amount).reduce((total,item) => {
        //             return total + item
        //         },0
        
        // ));

        console.log("Filter ingred", filterIngredients);

       
        return (
            <div className="container">
                <ol className="breadcrumb mb-3" style={{ marginTop: 100 }}>
                    <li className="breadcrumb-item active"><strong>My List</strong></li>
                </ol>
                <h3>My Shopping List From Recipes</h3>


                <table class="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th className="text-dark bg-primary" scope="col">Recipe Name</th>
                            <th className="text-dark bg-primary" scope="col">Ingredient</th>
                            <th className="text-dark bg-primary" scope="col">Quantity</th>
                            <th className="text-dark bg-primary" scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {/* {filterUser.map((item,index) => (
                            
                            <div key={index}>
                            
                                <tr><td>{item.recipeName}</td></tr>
                                <tr>{item.ingredients.map((element, i) => (
                                    <div key={i}>
                                        <td>{element.name}</td>
                                    </div>
                                    
                                ))}</tr>



                            </div>
                        ))} */}

                        {filterIngredients}
                    </tbody>
                </table>

                <div style={{ height: "150px" }}>

                    
                </div>

            </div>
        )
    }
}
ViewShoppingList.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(ViewShoppingList);
