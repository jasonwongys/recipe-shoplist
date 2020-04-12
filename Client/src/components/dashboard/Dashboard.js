import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import veggie from "./image/veggies.jpeg";
import pizza from "./image/pizza.jpeg";
import brunch from "./image/brunch.jpeg";
import imagebig from "./image/big.png";
import small from "./image/small_1.png";
import image2 from "./image/2.png"
import recipe2 from "./recipes/recpie_2.png"
import recipe3 from "./recipes/recpie_3.png"
import recipe5 from "./recipes/recpie_1.png"
import './dashboard.css';

class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };


  render() {
    const { user } = this.props.auth;

    return (
      <div className="container-fluid" id="carouselimg">
        
        
          
          <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel" >
            <ol class="carousel-indicators">
              <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            </ol>
            <div class="carousel-inner d-block mx-auto align-items-center">
              <div class="carousel-item active align-items-center flex-column p-4">
                <img class=" d-block w-100" src={veggie} alt="First slide"  />
                <div class="carousel-caption">
                                <h1 className="text-light display-3 ">Healthy lifestyle made easier</h1>
                                <p className="text-light display-4">Search from millions of recipes available</p>
                              </div>
                        </div>
              
              <div class="carousel-item align-items-center flex-column p-4">
                <img class="d-block w-100" src={pizza} alt="Second slide" />
                <div class="carousel-caption">
                                <h1 className="text-light display-3">Satisfy your cravings</h1>
                                <p className="text-light display-4">All cuisines within your fingertips</p>
                              </div>
              </div>

              <div class="carousel-item align-items-center flex-column p-4">
                <img class="d-block w-100" src={brunch} alt="Third slide" />
                <div class="carousel-caption">
                                <h1 className="text-dark display-3">Simplify your shopping list</h1>
                                <p className="text-dark display-4">And save time with one our app</p>
                              </div>
              </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
          <hr />




    <div class="recepie_videoes_area">
        <div class="container">
            <div class="row">
                <div class="col-xl-6 col-lg-6 col-md-6">
                    <div class="recepie_info">
                        <h3>Start searching for recipes here</h3>
                        
                    <p>Save your recipes and generate a personalised shopping list from your recipes to save hassle and time!! So what are your waiting for?</p>
                    <a href="/searchRecipes" className="btn btn-success">Click here to start!</a>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6">
                    <div class="videos_thumb">
                        <div class="big_img">
                            <img src={imagebig} alt=""/>
                        </div>
                        <div class="small_thumb">
                            <img src={small} alt=""/>
                        </div>
                        <div class="small_thumb_2">
                            <img src={image2} alt=""/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <hr />

          <div class="dish_area">
        <div class="container">
            <div class="row">
                <div class="col-xl-12">
                    <div class="dish_wrap d-flex">
                        <div class="single_dish text-center">
                            <div class="thumb">
                                <img src={recipe2} alt=""/>
                            </div>
                            <h3>Breakfast</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        </div>
                        <div class="single_dish text-center">
                            <div class="thumb">
                                <img src={recipe3} alt=""/>
                            </div>
                            <h3>Lunch</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        </div>
                        <div class="single_dish text-center">
                            <div class="thumb">
                                <img src={recipe5} alt=""/>
                            </div>
                            <h3>Dinner</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <footer class="footer">
            <div class="footer_top">
                <div class="container">
                    <div class="row">
                        <div class="col-xl-2 col-md-6 col-lg-2">
                            <div class="footer_widget">
                                <h3 class="footer_title">
                                    Top Products
                                </h3>
                                <ul>
                                    <li><a href="#">Managed Website</a></li>
                                    <li><a href="#"> Manage Reputation</a></li>
                                    <li><a href="#">Power Tools</a></li>
                                    <li><a href="#">Marketing Service</a></li>
                                </ul>
    
                            </div>
                        </div>
                        <div class="col-xl-2 col-md-6 col-lg-2">
                            <div class="footer_widget">
                                <h3 class="footer_title">
                                    Quick Links
                                </h3>
                                <ul>
                                    <li><a href="#">Jobs</a></li>
                                    <li><a href="#">Brand Assets</a></li>
                                    <li><a href="#">Investor Relations</a></li>
                                    <li><a href="#">Terms of Service</a></li>
                                </ul>
    
                            </div>
                        </div>
                        <div class="col-xl-2 col-md-6 col-lg-2">
                            <div class="footer_widget">
                                <h3 class="footer_title">
                                    Features
                                </h3>
                                <ul>
                                    <li><a href="#">Jobs</a></li>
                                    <li><a href="#">Brand Assets</a></li>
                                    <li><a href="#">Investor Relations</a></li>
                                    <li><a href="#">Terms of Service</a></li>
                                </ul>
    
                            </div>
                        </div>
                        <div class="col-xl-2 col-md-6 col-lg-2">
                            <div class="footer_widget">
                                <h3 class="footer_title">
                                    Resources
                                </h3>
                                <ul>
                                    <li><a href="#">Guides</a></li>
                                    <li><a href="#">Research</a></li>
                                    <li><a href="#">Experts</a></li>
                                    <li><a href="#">Agencies</a></li>
                                </ul>
    
                            </div>
                        </div>
                        <div class="col-xl-4 col-md-6 col-lg-4">
                                <div class="footer_widget">
                                        <h3 class="footer_title">
                                                Subscribe
                                        </h3>
                                        <p class="newsletter_text">You can trust us. we only send promo offers,</p>
                                        <form action="#" class="newsletter_form">
                                            <input type="text" placeholder="Enter your mail" />
                                            <button type="submit"> <i class="ti-arrow-right"></i> </button>
                                        </form>
                                        
                                    </div>
                        </div>
                    </div>
                </div>
            </div>
           
        </footer>

        
</div>

        
      
    );
  }
}
Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);