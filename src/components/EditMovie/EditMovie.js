import React, { Component } from 'react';
import { connect } from "react-redux";
// import { Multiselect } from 'multiselect-react-dropdown';
import './EditMovie.css';

class EditMovie extends Component {
    
    componentDidMount = () => {
        console.log('component did mount', this.props.match.params.id);
        this.props.dispatch({ type: 'GET_DETAILS', payload: this.props.match.params.id }) // specific movie GET
        this.props.dispatch({ type: 'GET_CATEGORY', payload: this.props.match.params.id }) // category GET
    } // end componentDidMount

handleChange = (event, inputProperty) => {
    event.preventDefault();
    console.log('event happened', event.target.value);
    let updatedMovie = { // creates an index 0 array to reference
        ...this.props.reduxStore.movies[0], 
        [inputProperty]: event.target.value
    } // end setState
    // sending the edited info to the reducer
    this.props.dispatch({ type: 'SET_MOVIES', payload: [updatedMovie] })
} // end handleChange

editMovie = (event, id) => {
    event.preventDefault();
    this.props.dispatch({ type: 'EDIT_MOVIE',
            payload: this.props.reduxStore.movies[0] }); // PUT ROUTE
    this.props.history.push(`/movieDetails/${id}`); // routes back to details page
        this.props.dispatch({ type: 'GET_DETAILS', payload: id }) // specific movie GET with updated info
        this.props.dispatch({ type: 'GET_CATEGORY', payload: id }) // category GET 
} // end editMovie

backToMovieDetails = (id) => {
    this.props.history.push(`/movieDetails/${id}`); // routes back to MovieDetails
} // end backToHome - CANCEL button
  
  render() {
    return (
      <div>
        <h3 className="editMovieBanner">EDIT MOVIE</h3>
        {this.props.reduxStore.movies.map(movie => 
        <form key={movie.id}>
            <div className="formBox formCard">
            <br></br>
            <label htmlFor="description">Description</label>
            <br></br>
                <textarea 
                    type="text" 
                    id="description" 
                    onChange={(event) => this.handleChange(event, 'description')}
                    value={this.props.reduxStore.movies[0].description}/>
            </div>

            <div className="formCard">
            <label htmlFor="movieTitle">Movie Title</label>
                <input 
                    type="text" 
                    id="movieTitle" 
                    onChange={(event) => this.handleChange(event, 'title')}
                    value={this.props.reduxStore.movies[0].title}/>
                    <br></br>
            <label htmlFor="posterUrl">Poster URL</label>
                <input 
                    type="text" 
                    id="posterUrl"
                    value={movie.poster}
                    readOnly/>
                    <br></br>
            <label htmlFor="category" id="newGenre">Genre</label>
                <select 
                    name="category" 
                    id="category" 
                    onChange={(event) => this.handleChange(event, 'genre_id')}>
                        <option>Select</option>
                        <option value="1">Action</option>
                        <option value="2">Adventure</option>
                        <option value="3">Animated</option>
                        <option value="4">Biographical</option>
                        <option value="5">Comedy</option>
                        <option value="6">Disaster</option>
                        <option value="7">Documentary</option>
                        <option value="8">Drama</option>
                        <option value="9">Epic</option>
                        <option value="10">Fantasy</option>
                        <option value="11">Horror</option>
                        <option value="12">Musical</option>
                        <option value="13">Romantic</option>
                        <option value="14">Science Fiction</option>
                        <option value="15">Space-Opera</option>
                        <option value="16">Superhero</option>
                        <option value="17">Thriller</option>
                </select>
                <br></br>
                    <button className="button" 
                            onClick={(event) => this.editMovie(event, movie.id)}>Save</button>
                    <button className="button"
                            onClick={() => this.backToMovieDetails(movie.id)}>Cancel</button>
            </div>
        </form>)}
      </div>
    );
  }
}

const putReduxStateOnProps = (reduxStore) => ({
    reduxStore,
});

export default connect(putReduxStateOnProps)(EditMovie);
