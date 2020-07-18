import React from 'react';
import './App.css';
import { AppNavbar, Footer } from './components';
import { Home, About, Simulator, DevelopmentBlog, Team, Contact } from './containers';
import { Provider } from 'react-redux';
import store from './store';

// routers
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

function App() {
  return (
      <Provider store={store}>
          <div className={"App"}>
              <Router>
                  <AppNavbar />
                  <Switch>
                      <Route exact path="/" component={Home} />
                      <Route exact path="/about" component={About} />
                      <Route exact path="/simulator" component={Simulator} />
                      <Route exact path="/team" component={Team} />
                      <Route exact path="/developmentblog" component={DevelopmentBlog} />
                      <Route exact path="/contact" component={Contact} />
                      <Redirect to="/" />
                  </Switch>
                  <Footer />
              </Router>
          </div>
      </Provider>
  );
}

export default App;