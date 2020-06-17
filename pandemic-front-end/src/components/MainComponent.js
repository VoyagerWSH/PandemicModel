import React, { Component } from 'react';
import Home from './HomeComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import DevelopmentBlog from './DevelopmentBlogComponent';
import Simulator from './SimulatorComponent';
import Team from './TeamComponent';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      promotions: state.promotions,
      leaders: state.leaders
    }
}

class Main extends Component {

  constructor(props) {
    super(props);
  }

  onDishSelect(dishId) {
    this.setState({ selectedDish: dishId});
  }

  render() {

    const HomePage = () => {
        return(
            <Home dish={this.props.dishes.filter((dish) => dish.featured)[0]}
                  promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
                  leader={this.props.leaders.filter((leader) => leader.featured)[0]}
            />
        );
    }


    return (
      <div>
        <Header />
        <Switch>
            <Route path="/home" component={HomePage} />
            {/*<Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
            <Route path="/menu/:dishId" component={DishWithId} />*/}
            <Route exact path="/about" component={() => <About leaders={this.props.leaders} />} />
            <Route exact path="/team" component={() => <Team/>} />
            <Route exact path="/simulator" component={Simulator} />
            <Route exact path="/developmentblog" component={DevelopmentBlog} />
            <Route exact path="/contactus" component={Contact} />
            <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(Main)); 