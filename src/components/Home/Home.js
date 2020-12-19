import React, { Component } from 'react';
import { connect } from "react-redux";
import './Home.css';

class Home extends Component {

    componentDidMount() {
        this.props.dispatch({type: 'GET_MOVIES' });
    }

    goToDetails = (id) => {
        console.log('id', id);
        this.props.history.push(`/movieDetails/${id}`);
        this.props.dispatch({ type: 'GET_DETAILS', payload: id })
        this.props.dispatch({ type: 'GET_CATEGORY', payload: id })
    }

  render() {
    return (
      <div>
          <section>
            {this.props.reduxStore.movies.map(movie => 
                <div className="display card" key={movie.id}>
                    <img alt={movie.title} src={movie.poster} height="300px" width="200px"/>
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

export default connect(putReduxStateOnProps)(Home);
