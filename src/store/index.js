import {createStore,applyMiddleware} from 'redux'
import rootReducer from '../reducers'
import logger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import routingMiddleware from '../middlewares/routingMiddleware';
import analyticsMiddleware from '../middlewares/analyticsMiddleware';

const INITIAL_STATE = {}
const configureStore = (initialState = INITIAL_STATE) => {
	if (process.env.NODE_ENV === 'production' || (location && location.hostname !== 'localhost')) {
		return createStore(rootReducer,initialState,applyMiddleware(thunkMiddleware,routingMiddleware,analyticsMiddleware));	
	} 
	else {
		return createStore(rootReducer,initialState,applyMiddleware(thunkMiddleware,routingMiddleware,analyticsMiddleware,logger()));	
	}

};

export default configureStore;