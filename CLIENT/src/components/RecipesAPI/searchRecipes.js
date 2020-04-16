import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import dataFile from './spoonacular.json'
import { id, pw } from './api/Apikey'


const Recipe = props => (

    <div className="col-sm-3" style={{ marginTop: "10px" }}>
        <div className="card" style={{ backgroundSize: "contain" ,height:"600px" }}>
            <img src={props.image} className="card-img-top" alt="" style={{ height: "50%" }} />
            
                <div className="card-body mb-2" style={{ height:"350px",padding:"15px" }}>
                    <h5 className="card-title text-dark mb-2"><strong >{props.recipeName}</strong></h5>
                </div>
                <div className="card-footer mb-3">
                    <i class="fas fa-clock"></i>  <small className="">Ready in minutes {props.readyinMins}</small>
                    <br/>
                    <i class="fas fa-utensils"></i>  <small className="">Servings  {props.servings}</small>
                </div>
                <Link to={{
                    pathname: `/recipes/${props.id}`,
                    recipeProps: {
                        // uri: props.uri,
                        id: props.id,
                        recipeName: props.recipeName,
                        image: props.image,

                    }
                }} className="btn btn-danger">View Recipe</Link>

            
        </div>
    </div>

)

export default class SearchRecipes extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            query: ' '
        }
        this.searchQuery = this.searchQuery.bind(this);
        this.getSearch = this.getSearch.bind(this);
    }


    componentDidMount() {

        this.setState({
            data: dataFile
        })

    }




    searchQuery(e) {
        this.setState({
            query: e.target.value

        })

        console.log("query passed", this.state.query)
    }

    getSearch(e) {
        e.preventDefault();
        axios({
            "method":"GET",
            "url":"https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search",
            "headers":{
            "content-type":"application/octet-stream",
            "x-rapidapi-host":id,
            "x-rapidapi-key":pw
            },"params":{
            "number":"10",
            "offset":"0",
            "type":"main course",
            "query":`${this.state.query}`
            }
            })
            .then((response)=>{
                console.log("Replied: ",response.data.results)
                this.setState({
                    data: response.data.results
                })
            })
            .catch((error)=>{
                console.log(error)
            })

    }

    render() {
        console.log("State ", this.state.data);



        return (
            <div className="container-fluid" style={{padding: "20px"}}>
                <ol className="breadcrumb mb-3" style={{ marginTop: "80px" }}>
                    <li className="breadcrumb-item active"><strong>Search Recipes</strong></li>
                </ol>


                <form onSubmit={this.getSearch} className="search-form">
                    <input
                        className="form-control mr-sm-5"
                        onChange={this.searchQuery}
                        type="text"
                        placeholder="Search Recipe..."
                    />
                    <button className="btn btn-primary" style={{ margin: "10px" }} type="submit"> search</button>
                </form>
                <div className="row">
                    <div class="card-deck">
                        {this.state.data.map((recipe) => {
                            return <Recipe
                                key={recipe.id}
                                id={recipe.id}
                                recipeName={recipe.title}
                                readyinMins={recipe.readyInMinutes}
                                servings={recipe.servings}
                                image={`https://spoonacular.com/recipeImages/${recipe.image}`}
                            />
                        })}
                    </div>
                </div>


            </div>


        )
    }
}
