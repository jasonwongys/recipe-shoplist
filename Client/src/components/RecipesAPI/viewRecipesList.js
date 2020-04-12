import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Axios from 'axios';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";



const RecipeCard = props => (

    

    <div className="row" style={{ margin: "10px", boxShadow: "5px 5px #DCDCDC", border: "solid #3CB371 2px", height: "275px" }}>
        <div className="col-md-4">
            <img className="img-responsive" src={props.listItems.image} style={{  padding: "15px", height: "250px" }} />
        </div>

        <div className="col-md-8">

            <h2><strong>{props.listItems.recipeName}</strong></h2>

            <div className="row">
                <h5>Diet Type:   </h5>
                    {props.vegetarian}
                    {props.glutenFree}
                    {props.vegan}
                    {props.dairyFree}
                            
            </div>

            {/* <Link to={'/shoplist/'+props.listItems._id} className="btn btn-success">Edit </Link>  */}

            <div className="row">
            <span style={{ padding: "5px" }}><h5 className="text-dark" ><i class="fas fa-star text-warning"></i>Health Score: {props.healthScore}</h5></span>

            </div>
            <div className="row" >
                

                <div className="col-xs-4" style={{ margin: "5px" }} >
                    <Link to={{
                        pathname: `/recipes/${props.id}`,
                        recipeProps: {
                            
                            id: props.id,
                            listItems: props.listItems

                        }
                    }} className="btn btn-danger">View this Recipe</Link>
                </div>

                <div className="col-xs-4" style={{ margin: "5px" }}>
                    <Link to={{
                        pathname: `/api/users/recipe/${props.userID}`
                    }} className="btn btn-danger" onClick={() => { props.deleteRecipe(props.listItems._id) }}> Delete Recipe</Link>
                </div>
            </div>
            </div>

    </div>
)

class viewRecipesList extends Component {
    constructor(props) {
        super(props);

        this.state = {

            recipes: [],
            userid: ''

        }

        this.deleteRecipe = this.deleteRecipe.bind(this);
    }

    deleteRecipe(id) {
        Axios.delete(`https://recipe-shoplist.herokuapp.com/recipes/` + id)
            .then(response => { console.log(response.data) });

        const updateState = this.state.recipes.filter(el => el._id !== id);

        this.setState({
            recipes: updateState

        })

        console.log("Userlist", this.state.userList);

    }


    componentDidMount() {

        Axios.get(`https://recipe-shoplist.herokuapp.com/recipes/`)
            .then(response => {
                this.setState({
                    recipes: response.data,
                    userid: this.props.auth.user.id
                })
            })

    }



    render() {


        console.log("User List data", this.state.recipes);

        console.log("USERID", this.state.userid);

        let filterUser = this.state.recipes.filter((i) => {
            if (i.userid === this.state.userid) {
                return i
            }
        });

        console.log("FILTER USER", filterUser);

        let userfilterlist = filterUser.map((currentItem) => {

            return <RecipeCard listItems={currentItem}
                        key={currentItem._id}
                        id={currentItem._id}
                        vegetarian={currentItem.vegetarian ? <h5><span class="badge badge-primary" style={{ margin: "5px" }}>Vegatarian</span></h5> : null}
                        glutenFree={currentItem.glutenFree ? <h5><span class="badge badge-info" style={{ margin: "5px" }}>Gluten Free</span></h5> : null}
                        vegan={currentItem.vegan ? <h5><span class="badge badge-success" style={{ margin: "5px" }}>Vegan</span></h5> : null}
                        dairyFree={currentItem.dairyFree ? <h5><span class="badge badge-secondary" style={{ margin: "5px" }}>Dairy Free</span></h5> : null}
                        healthScore={currentItem.healthScore}
                        userID={this.props.auth.user.id}
                        deleteRecipe={this.deleteRecipe} />

        })

        return (
            <div className="container">
                <ol className="breadcrumb mb-3" style={{ marginTop: 100 }}>
                    <li className="breadcrumb-item active"><strong>My List</strong></li>
                </ol>
                <h3>Saved Recipes</h3>

                <Link className="btn btn-info" to="/shoplist">Generate Shop List <i class="fas fa-clipboard"></i></Link>

                <div style={{ height: "150px" }}>
                    {userfilterlist}
                </div>


            </div>
        )
    }
}
viewRecipesList.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(viewRecipesList);