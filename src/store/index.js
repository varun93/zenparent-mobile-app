import {createStore,applyMiddleware} from 'redux'
import rootReducer from '../reducers'
import logger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

const INITIAL_STATE = {}
const configureStore = (initialState = INITIAL_STATE) => {
	if (process.env.NODE_ENV === 'production' || (location && location.hostname !== 'localhost')) {
	 		return createStore(rootReducer,initialState,applyMiddleware(thunkMiddleware));	
	} 
	else {
	  		return createStore(rootReducer,initialState,applyMiddleware(thunkMiddleware,logger()));	
	}
};

export default configureStore