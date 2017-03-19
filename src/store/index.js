import {createStore,applyMiddleware} from 'redux'
import rootReducer from '../reducers'
import logger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

const INITIAL_STATE = {}
const configureStore = (initialState = INITIAL_STATE) => createStore(rootReducer,initialState,applyMiddleware(thunkMiddleware,logger()))
export default configureStore	

