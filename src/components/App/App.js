import React, { Component } from 'react';
import {HashRouter as Router, Route, Link} from 'react-router-dom';
import './App.css';

import Home from '../Home/Home';
import MovieForm from '../MovieForm/MovieForm';
import MovieDetail from '../MovieDetail/MovieDetail';

class App extends Component {
  // Renders the entire app on the DOM
  render() {
    return (
      <div className="App">
        <h1 className="header">HB OH-NO!</h1>
        <Router>
          <div className="navBar">
          <nav>
            <ul>
              <li><Link to ="/">Home</Link></li> 
              <li><Link to ="/movieForm">Add a Movie</Link></li>
              {/* <li><Link to ="/movieDetails">Movie Details</Link></li> */}
            </ul>
          </nav>
          </div>
          <Route exact path="/" component={Home}/>
          <Route path="/movieForm" component={MovieForm} />
          <Route path="/movieDetails/:id" component={MovieDetail} />
        </Router>
      </div>
    );
  }
}

export default App;