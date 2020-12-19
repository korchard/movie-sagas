import React, { Component } from 'react';
import { connect } from "react-redux";
import './MovieList.css';

// import material UI
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
// import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
});

class MovieList extends Component {

  state = {
    spacing: '32',
  };

    componentDidMount() {
        this.props.dispatch({type: 'GET_MOVIES' });
    } // end componentDidMount - calls GET request

    goToDetails = (id) => {
        console.log('id', id);
        this.props.history.push(`/movieDetails/${id}`); // routes to details page
        this.props.dispatch({ type: 'GET_DETAILS', payload: id }) // specific movie GET
        this.props.dispatch({ type: 'GET_CATEGORY', payload: id }) // category GET
    } // end goToDetails 

  render() {
    // renders all the movies to the DOM
    const { classes } = this.props;
    const { spacing } = this.state;

    return (
      <Grid container className={classes.root} spacing={32}>
        <Grid item xs={12}>
          <Grid container className={classes.demo} justify="center" spacing={Number(spacing)}>
            {this.props.reduxStore.movies.map(movie =>
              <Grid className="display card" key={movie.id}>
                <img className="homeImg" alt={movie.title} src={movie.poster} height="300px" width="200px"/>
                <br></br>
                    <button className="button" 
                             onClick={() => this.goToDetails(movie.id)}>{movie.title}</button>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>

      // <div>
      //     <section>
      //       {this.props.reduxStore.movies.map(movie => 
      //           <div className="display card" key={movie.id}>
      //               <img className="homeImg" alt={movie.title} src={movie.poster} height="300px" width="200px"/>
      //               <br></br>
      //               <button className="button" 
      //                       onClick={() => this.goToDetails(movie.id)}>{movie.title}</button>
      //           </div>
      //       )}
      //     </section>
      // </div>
    );
  }
}

const putReduxStateOnProps = (reduxStore) => ({
    reduxStore,
});

MovieList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(putReduxStateOnProps)(withStyles(styles)(MovieList));
