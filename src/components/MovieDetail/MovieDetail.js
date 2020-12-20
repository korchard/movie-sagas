import React, { Component } from 'react';
import { connect } from "react-redux";
// import {HashRouter as Router, Route} from 'react-router-dom';
import './MovieDetail.css';

class MovieDetail extends Component {

    editMovie = (movie) => {
        console.log('id', movie.id);
        this.props.history.push(`/editMovie/${movie.id}`); // routes to details page
        this.props.dispatch({ type: 'GET_DETAILS', payload: movie.id }) // specific movie GET
        this.props.dispatch({ type: 'GET_CATEGORY', payload: movie.id }) // category GET
    }

  render() {
    // renders specific movie details

    return (
      <div>
          <section>
                {this.props.reduxStore.movies.map(movie => 
                    <div key={movie.id}>
                        <img className="detailImg" alt={movie.title} src={movie.poster} height="600px" width="400px"/>
                            <br></br>
                        <div className="detailText">
                            <h1 className="detailTitle">{movie.title}</h1>
                            <div className="detailCard">
                                {this.props.reduxStore.genres.map(genre => 
                                <p className="detailGenre" key={genre.name}>{genre.name}</p>)}
                                    <br></br>
                                {movie.description}
                            </div>
                            <br></br>
                            <button onClick={() => this.editMovie(movie)} className="detailButton">Edit</button>
                        </div>
                    </div>
                )}
          </section>
      </div>
    );
  }
}

const putReduxStateOnProps = (reduxStore) => ({
    reduxStore
});

export default connect(putReduxStateOnProps)(MovieDetail);
