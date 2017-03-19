import React from 'react';
import {Navigator} from 'react-onsenui';
import {generateNavigationKey} from '../utils';
import MainScreen from '../screens/MainScreen';
import AuthScreen from '../screens/AuthScreen';
import APP_VERSION from '../constants';

// check for for the token, if not present make a request
export default class App extends React.Component {
  
  componentWillMount(){
    this.props.appInit(APP_VERSION);
  }

  //replace this with props
  renderPage(route, navigator) {
    const props = route.props || {};
    props.navigator = navigator;
    if('toggleBookmark' in route) props.toggleBookmark = route.toggleBookmark;
    if('toggleLike' in route) props.toggleLike = route.toggleLike;
    if('navigator' in route) props.navigator = route.navigator;
    if('term' in route) props.term = route.term;
    if('user' in route) props.user = route.user;
    if('post' in route) props.post = route.post;
    if('chatroomId' in route) props.chatroomId = route.chatroomId;
    if('key' in route) props.key = route.key || route.component.toString();
    return React.createElement(route.component, props);
  }

  render() {
    let component = AuthScreen;
    let key = 'auth-screen';
   
    if(window.localStorage.jwt){
      component = MainScreen;
      key = 'main-screen';
    }
    
    key = generateNavigationKey(key);

    return (
        <Navigator initialRoute={{component,key}} renderPage={this.renderPage.bind(this)} />
      );
    }

 }
 