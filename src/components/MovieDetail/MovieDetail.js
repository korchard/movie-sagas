import React, { Component } from 'react';
import { connect } from "react-redux";
// import {HashRouter as Router, Route} from 'react-router-dom';
import './MovieDetail.css';

class MovieDetail extends Component {


  render() {
    return (
      <div>
          <section>
                {this.props.reduxStore.genres.map(genre => 
                    <p key={genre.name}>{genre.name}</p>)}

                {this.props.reduxStore.movies.map(movie => 
                    <div key={movie.id}>
                        <h1>{movie.title}</h1>
                        <img alt={movie.title} src={movie.poster} />
                        <br></br>
                        <p>{movie.description}</p>
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
