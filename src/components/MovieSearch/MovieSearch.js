import React, { Component } from 'react';
import { connect } from "react-redux";
import './MovieSearch.css';

class MovieSearch extends Component {

    state = {
        search: ''
    }

    handleChange = (event) => {
        console.log('search', event.target.value);
        this.setState({
            search: event.target.value
        }) // end setState
    } // end handleChange

    searchMovie = () => {
        this.props.dispatch({ type: 'GET_SEARCH', payload: this.state.search });
    } // end searchMovie
  
  render() {
    return (
      <div >
        <h1 className="detailTitle">Search Movies</h1>
        <label htmlFor="movieSearch">Movie Title</label>
                <input 
                    type="text" 
                    id="movieSearch" 
                    onChange={this.handleChange}/>
                <button className="button" 
                    onClick={this.searchMovie}>Find</button>
        {/* <div className="center"> */}
        {/* {this.props.reduxStore.movies.map(movie => 
            <div className="display card" key={movie.id}>
                <img className="homeImg" alt={movie.title} src={movie.poster} height="300px" width="200px"/>
                <br></br>
                <button className="button" 
                        onClick={() => this.goToDetails(movie.id)}>{movie.title}</button>
        )} */}
        {/* </div> */}
    </div>
    );
  }
}

const putReduxStateOnProps = (reduxStore) => ({
    reduxStore,
});

export default connect(putReduxStateOnProps)(MovieSearch);
