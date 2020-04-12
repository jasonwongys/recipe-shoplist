import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import SearchRecipes from "./components/RecipesAPI/searchRecipes";
import addRecipe from "./components/RecipesAPI/addRecipe";
import './App.css';
import viewRecipesList from './components/RecipesAPI/viewRecipesList';
import CreateShopList from './components/ShoppingList/createShoppingList';
import EditShopList from './components/ShoppingList/editShoppingList';
import ViewSingleRecipe from './components/RecipesAPI/viewSingleRecipe';
import viewShoppingList from './components/ShoppingList/viewShoppingList'

if(localStorage.jwtToken) {
  //Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);

  //Decode token and get user infor and exp
  const decoded = jwt_decode(token);
  //Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  //check for expired token
  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    // logout user
    store.dispatch(logoutUser());

    // redirect to login
    window.location.href = "./login";
  }
}

class App extends Component {
  render() {
    
  return (
    
    <Provider store={store}>
    <Router>
      <div className="container-fluid" style={{height: "100vh"}}>
        <Navbar/>
        
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
       
        <Route exact path="/" component={Landing} />
        <Switch>
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
    
          <PrivateRoute exact path="/recipes/:id" component={addRecipe}  />
          <PrivateRoute exact path="/api/users/recipe/:id" component={viewRecipesList} />
          <PrivateRoute exact path="/viewSingleRecipe" component={ViewSingleRecipe} />
          <PrivateRoute exact path="/shoplist" component={viewShoppingList} />
          <PrivateRoute exact path="/searchRecipes" component={SearchRecipes} />


        </Switch>
      </div>


    </Router>
    </Provider>
  );
   
}
}

export default App;
