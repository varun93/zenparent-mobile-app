import {createStore,applyMiddleware} from 'redux'
import rootReducer from '../reducers'
import logger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import routingMiddleware from '../middlewares/routingMiddleware';

const INITIAL_STATE = {}
const configureStore = (initialState = INITIAL_STATE) => {
	if (process.env.NODE_ENV === 'production' || (location && location.hostname !== 'localhost')) {
	 		return createStore(rootReducer,initialState,applyMiddleware(thunkMiddleware,routingMiddleware));	
	} 
	else {
	  		return createStore(rootReducer,initialState,applyMiddleware(thunkMiddleware,routingMiddleware,logger()));	
	}
};

export default configureStore