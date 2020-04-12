import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Axios from 'axios';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class AddRecipe extends Component {
    constructor(props) {
        super(props)

        this.state = {
            recipes: [],
            ingredients: [],
            instructions: [],
            recipeName: '',
            image: "",
            recipeId: '',
            userid: ''

        }

        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    componentDidMount() {
        Axios({
            "method": "GET",
            "url": `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${this.props.match.params.id}/information`,
            "headers": {
                "content-type": "application/octet-stream",
                "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
                "x-rapidapi-key": "UBAfYVpnSWmshBuJvA7bJjUSrkKnp1EtwifjsnylcoFhUb9s6R"
            }
        })
            .then(response => {
                this.setState({
                    recipes: response.data,
                    recipeName: response.data.title,
                    recipeId: response.data.id,
                    image: response.data.image,
                    ingredients: response.data.extendedIngredients,
                    instructions: response.data.analyzedInstructions[0].steps,

                })
            })
            .catch((error) => {
                console.log(error)
            })



    }

    onSubmitHandler(e) {
        e.preventDefault();


        const newRecipe = {

            recipeId: this.state.recipeId,

            recipeName: this.state.recipeName,
            image: this.state.image,
            userid: this.props.auth.user.id,
            ingredients: this.state.ingredients,
            instructions: this.state.instructions,
            vegetarian: this.state.recipes.vegetarian,
            glutenFree: this.state.recipes.glutenFree,
            vegan: this.state.recipes.vegan,
            dairyFree: this.state.recipes.dairyFree,
            healthScore: this.state.recipes.healthScore


        }

        Axios.post(`https://recipe-shoplist.herokuapp.com/recipes/`, newRecipe)
            .then(res => console.log(res.data),
                this.props.history.push("/searchRecipes"))
            .then(
                window.alert("Recipe added to list")
            );



        // Axios.post(`http://localhost:5000/recipes/users/${this.props.auth.user.id}`, newRecipe)
        //     .then(res => console.log(res.data),
        //             this.props.history.push("/searchRecipes"));

        this.setState({
            instructions: [],
            recipeId: '',
            recipeName: '',
            image: '',
            userid: '',
            ingredients: []
        })
        console.log("Recipe saved to list", newRecipe);
    }

    render() {


        console.log("API data", JSON.stringify(this.state.recipes));

        let link = this.state.recipes.sourceUrl;
        console.log("Link", link)

        let newInstructions = this.state.instructions.map(i => { return <li style={{ margin: "15px" }}>{i.step}</li> })

        let getVegetarian = this.state.recipes.vegetarian ? <h5><span class="badge badge-primary" style={{ margin: "5px" }}>Vegatarian</span></h5> : null
        let getGlutenFree = this.state.recipes.glutenFree ? <h5><span class="badge badge-info" style={{ margin: "5px" }}>Gluten Free</span></h5> : null
        let getVegan = this.state.recipes.vegan ? <h5><span class="badge badge-success" style={{ margin: "5px" }}>Vegan</span></h5> : null
        let getDairyFree = this.state.recipes.dairyFree ? <h5><span class="badge badge-secondary" style={{ margin: "5px" }}>Dairy Free</span></h5> : null
        let getHealthy = this.state.recipes.veryHealthy ? <h5><span class="badge badge-warning" style={{ margin: "5px" }}>Very Healthy</span></h5> : null
        let getCheap = this.state.recipes.cheap ? <h5><span class="badge badge-danger" style={{ margin: "5px" }}>Very Healthy</span></h5> : null
        let getSustainable = this.state.recipes.sustainable ? <h5><span class="badge badge-success" style={{ margin: "5px" }}>Very Healthy</span></h5> : null
        let getPopular = this.state.recipes.veryPopular ? <h5><span class="badge badge-success" style={{ margin: "5px" }}>Very Popular</span></h5> : null

        return (
            <div className="container" >

                <ol className="breadcrumb mb-3" style={{ marginTop: 100 }}>
                    <li className="breadcrumb-item active"><strong>View Recipes</strong></li>
                </ol>

                <form onSubmit={this.onSubmitHandler}>
                    <div className="form-group">
                        <h1>{this.state.recipes.title}</h1>



                        <div className="row">
                            <div className="col-lg-7">
                                <img src={this.state.recipes.image} alt={this.state.recipes.title} style={{ width: "100%", height: "80%" }} />
                            </div>



                            <div className="col-lg-5">

                                <div className="row">
                                    <h5><i class="fas fa-user-circle"></i>Recipe By: {this.state.recipes.sourceName}</h5>
                                </div>
                                

                                <div className="row">
                                    <h5>Tags:   </h5>
                                    {getVegetarian}
                                    {getGlutenFree}
                                    {getVegan}
                                    {getDairyFree}
                                    {getHealthy}
                                    {getCheap}
                                    {getSustainable}
                                    {getPopular}

                                </div>

                                <div className="row">

                                    <div style={{ padding: "5px" }}><h5 className="text-dark"><i className="fa fa-thumbs-up text-info"></i> {this.state.recipes.aggregateLikes} Likes </h5></div><br/>
                                    <div style={{ padding: "5px" }}><h5 className="text-dark"><i class="fas fa-award text-danger"></i> Spoonacular Score: {this.state.recipes.spoonacularScore}</h5></div><br/>
                                    <div style={{ padding: "5px" }}><h5 className="text-dark" ><i class="fas fa-star text-warning"></i>Health Score: {this.state.recipes.healthScore}</h5></div><br/>
                                    <div style={{ padding: "5px" }}><h5 className="text-dark"><i class="fas fa-clock text-secondary"></i> Ready in minutes: {this.state.recipes.readyInMinutes}</h5></div><br/>
                                    <div style={{ padding: "5px" }}><h5 className="text-dark"><i class="fas fa-utensils text-success text-active"></i> Servings: {this.state.recipes.servings}</h5></div><br/>
                                </div>

                                </div>


                                <div className="row">
                                    <div className="form-group" >
                                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
                                            Recipe Introduction
                                        </button>

                                        <input type="submit" value="Add Recipe" className="btn btn-primary" style={{ margin: "10px" }} />
                                    </div>


                                    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" >
                                        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h3 class="modal-title" id="exampleModalLongTitle">{this.state.recipes.title}</h3>
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div class="modal-body">
                                                    <img src={this.state.recipes.image} alt={this.state.recipes.title} style={{ width: "100%", height: "80%" }} />

                                                    <p>{this.state.recipes.summary}</p>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <h4>Instructions</h4>
                            <hr />
                            <ol>
                                {newInstructions}
                            </ol>
                        </div>

                        <div className="col-md-6">
                            <h4>Ingredients Needed</h4>
                            <hr />
                            
                            <ul className="list-group">
                                {this.state.ingredients.map(i => { return <li className="list-group-item">{i.originalString}</li> })}
                            </ul>
                        </div>

                    </div>

                </form>
                <Link to="/searchRecipes" className="btn btn-primary">Back to search</Link>

            </div>

        )
    }
}
AddRecipe.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(AddRecipe);