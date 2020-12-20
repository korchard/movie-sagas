import React, { Component } from 'react';
import { connect } from "react-redux";
import './MovieSearch.css';

class MovieSearch extends Component {

    componentDidMount() {
        this.props.dispatch({type: 'GET_SEARCH' });
    } // end componentDidMount - calls SEARCH GET request

    // local state
    state = {
        search: ''
    }

    handleChange = (event) => {
        console.log('search', event.target.value);
        this.setState({
            search: event.target.value
        }) // end setState
    } // end handleChange

    goToDetails = (id) => {
        console.log('id', id);
        this.props.history.push(`/movieDetails/${id}`); // routes to details page
        this.props.dispatch({ type: 'GET_DETAILS', payload: id }) // specific movie GET
        this.props.dispatch({ type: 'GET_CATEGORY', payload: id }) // category GET
    } // end goToDetails 

    searchMovie = () => {
        this.props.dispatch({ type: 'GET_SEARCH', payload: this.state.search }); // GET search
        this.setState({
            search: ''
        }) // end setState
    } // end searchMovie
  
  render() {
    return (
      <div >
        <h1 className="detailTitle">Search Movies</h1>
        <label htmlFor="movieSearch">Movie Title</label>
                <input 
                    type="text" 
                    id="movieSearch" 
                    value={this.state.search}
                    onChange={this.handleChange}/>
                <button className="button" 
                    onClick={this.searchMovie}>Find</button>
        <section>
        {this.props.reduxStore.movies.map(movie => 
            <div className="display card" key={movie.id}>
                <img className="homeImg" alt={movie.title} src={movie.poster} height="300px" width="200px"/>
                <br></br>
                <button className="button" 
                        onClick={() => this.goToDetails(movie.id)}>{movie.title}</button>
            </div>
        )}
        </section>
    </div>
    );
  }
}

const putReduxStateOnProps = (reduxStore) => ({
    reduxStore,
});

export default connect(putReduxStateOnProps)(MovieSearch);
