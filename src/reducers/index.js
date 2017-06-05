import {combineReducers} from 'redux';
import blogReducer from './blogReducer';
import userReducer from './userReducer';
import chatReducer from './chatReducer';
import userInterestsReducer from './userInterestsReducer';

const rootReducer = combineReducers({
	blog : blogReducer,
	user : userReducer,
	chat : chatReducer,
	userInterests : userInterestsReducer

})

export default rootReducer