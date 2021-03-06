import React, { Component } from 'react';
import {HashRouter as Router, Route, Link} from 'react-router-dom';
import './App.css';

import MovieList from '../MovieList/MovieList';
import MovieForm from '../MovieForm/MovieForm';
import MovieSearch from '../MovieSearch/MovieSearch';
import MovieDetail from '../MovieDetail/MovieDetail';
import EditMovie from '../EditMovie/EditMovie';

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
                  <li><Link to ="/">Movie List</Link></li> 
                  <li><Link to ="/movieForm">Add a Movie</Link></li>
                  <li><Link to ="/movieSearch">Search</Link></li>
                </ul>
              </nav>
            </div>
            <Route exact path="/" component={MovieList}/>
            <Route path="/movieForm" component={MovieForm} />
            <Route path="/movieSearch" component={MovieSearch} />
            <Route path="/movieDetails/:id" component={MovieDetail} />
            <Route exact path="/editMovie/:id" component={EditMovie} />
          </Router>
      </div>
    );
  }
}

export default App;
