import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
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

let store = configureStore(initialState)
const rootElement = document.getElementById('app');

ReactDOM.render(
    <Provider store={store}>
		<App />
	</Provider>,
  rootElement
)
