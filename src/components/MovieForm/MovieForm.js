import React, { Component } from 'react';
import { connect } from "react-redux";
import './MovieForm.css';

class MovieForm extends Component {

    state = {
        title: '',
        poster: '', 
        description: '',
        genre: '',
    }

    handleChange = (event, inputProperty) => {
        event.preventDefault();
        console.log('event happened', event.target.value);
        this.setState({
            [inputProperty]: event.target.value,
        });
    }

    addMovie = (event) => {
        event.preventDefault();
        console.log(this.state);
        this.props.dispatch({ type: 'ADD_MOVIE',
                payload: {
                title: this.state.title,
                poster: this.state.poster,
                description: this.state.description,
                genre: this.state.genre,
            }});
        this.props.history.push('/');
    }

    backToHome = () => {
        this.props.history.push('/');
    }

  render() {
    return (
      <div>
        <h1>MovieForm!</h1>
        <form>
            <label htmlFor="movieTitle">Movie Title</label>
                <input type="text" id="movieTitle" onChange={(event) => this.handleChange(event, 'title')}/>
            <label htmlFor="posterUrl">Poster URL</label>
                <input type="url" id="posterUrl" onChange={(event) => this.handleChange(event, 'poster')}/>
            <label htmlFor="description">Description</label>
                <textarea type="text" id="description" onChange={(event) => this.handleChange(event, 'description')}/>
            <label htmlFor="category">Genre:</label>
                <select name="category" id="category" onChange={(event) => this.handleChange(event, 'genre')}>
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
                <button onClick={this.addMovie}>Save</button>
        </form>
                <button onClick={this.backToHome}>Cancel</button>
      </div>
    );
  }
}

export default connect()(MovieForm);
