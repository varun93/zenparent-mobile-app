import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import throttle from 'lodash/throttle';
import {saveState} from './src/utils/localStorage';
import initialState from './src/constants/initialState';
require('es6-promise').polyfill();
require('es6-object-assign').polyfill();

// main app screen
import App from './src/screens/App'
//import the store
import configureStore from  './src/store'

// Onsen UI Styling and Icons
require('onsenui/css/onsenui.css');
require('onsenui/css/onsen-css-components.css');
require('styles/common.css');

let store = configureStore(initialState);

// throttle the write to the local storage

store.subscribe(throttle(() =>{
	saveState(store.getState().user);
},1000));

const rootElement = document.getElementById('app');

ReactDOM.render(
    <Provider store={store}>
		<App />
	</Provider>,
  rootElement
)


 