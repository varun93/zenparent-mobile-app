import {createStore,applyMiddleware} from 'redux'
import rootReducer from '../reducers'
import logger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import routingMiddleware from '../middlewares/routingMiddleware';
import analyticsMiddleware from '../middlewares/analyticsMiddleware';
import cacheMiddleware from '../middlewares/cacheMiddleware';

const INITIAL_STATE = {};

const configureStore = (initialState = INITIAL_STATE) => {
	if (process.env.NODE_ENV === 'production') {
		return createStore(rootReducer,initialState,applyMiddleware(thunkMiddleware,routingMiddleware,cacheMiddleware,analyticsMiddleware));	
	} 
	else {
		return createStore(rootReducer,initialState,applyMiddleware(thunkMiddleware,routingMiddleware,cacheMiddleware,analyticsMiddleware,logger()));	
	}

};

export default configureStore;