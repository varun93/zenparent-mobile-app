import {combineReducers} from 'redux';
import blogReducer from './blogReducer';
import userReducer from './userReducer';
import chatReducer from './chatReducer';

const rootReducer = combineReducers({
	blog : blogReducer,
	user : userReducer,
	chat : chatReducer
})

export default rootReducer