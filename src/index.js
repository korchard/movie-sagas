import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';

// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';

// Import saga middleware
import createSagaMiddleware from 'redux-saga';

// Import for routes
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// rootSaga generator function
function* rootSaga() {
    yield takeEvery('GET_MOVIES', getMovies);
    yield takeEvery('GET_DETAILS', getDetails);
    yield takeEvery('GET_CATEGORY', getCategory);
    yield takeEvery('GET_SEARCH', getSearch);
    yield takeEvery('ADD_MOVIE', addMovie);
    yield takeEvery('EDIT_MOVIE', editMovie);
} // end rootSaga

// GET ROUTE - for all movies on HOME page
function* getMovies() {
    try {
        const response = yield axios.get('/api/movie');
        // sends data to movie reducer
        yield put({ type: 'SET_MOVIES', payload: response.data })
    } catch (error) {
      console.log('Bad news bears, error with INDEX GET', error);
    }
} // end getMovies

// GET ROUTE - for specific movie details
function* getDetails(action) {
    try {
        const response = yield axios.get(`/api/movie/${action.payload}`);
        // sends specific movie to the movie reducer
        yield put({ type: 'SET_MOVIES', payload: response.data })
        console.log('getDetails', response.data);
    } catch (error) {
      console.log('Bad news bears, error with INDEX GET', error);
    }
} // end getDetails

// GET ROUTE - for specific movie genres
function* getCategory(action) {
    try {
        const response = yield axios.get(`/api/genre/${action.payload}`);
        // sends specific movie genres to the genres reducer
        yield put({ type: 'SET_GENRES', payload: response.data })
        console.log('getCategory', response.data);
    } catch (error) {
      console.log('Bad news bears, error with INDEX GET', error);
    }
} // end getCategory

// GET ROUTE - for search
function* getSearch(action) {
    console.log('search', action.payload );
    try {
        const response = yield axios.get(`/api/movie/search/${action.payload}`);
        // sends specific movie to the movie reducer
        yield put({ type: 'SET_SEARCH', payload: response.data })
        console.log('getSearch', response.data);
    } catch (error) {
      console.log('Bad news bears, error with INDEX GET', error);
    }
} // end getSearch

// POST ROUTE
function* addMovie( action ) {
    console.log('index post', action.payload);
    try { 
        yield axios.post('/api/movie', action.payload)
        // calls GET ROUTE to refresh home page with new movie
        yield put({ type: 'GET_MOVIES' }) 
    } catch (error) {
        console.log('Bad news bears, error with INDEX POST', error);
    }
} // end addMovie

// PUT ROUTE
function* editMovie( action ) {
    console.log('index put', action.payload);
    try { 
        yield axios.put(`/api/movie/${action.payload.id}`, action.payload)
        // calls GET ROUTE to refresh details page with new movie
        yield put({ type: 'SET_MOVIES' }) 
    } catch (error) {
        console.log('Bad news bears, error with INDEX PUT', error);
    }
} // end addMovie

// sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        case 'SET_SEARCH':
            return action.payload;
        default:
            return state;
    }
} // end movie REDUCER

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
} // end genre REDUCER

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, 
    document.getElementById('root'));
registerServiceWorker();
