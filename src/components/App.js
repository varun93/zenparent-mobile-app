import React,{Component} from 'react';
import {Navigator} from 'react-onsenui';
import {generateNavigationKey} from '../utils';
import MainScreen from '../screens/MainScreen';
import AuthScreen from '../screens/AuthScreen';
import {loadState} from '../utils/localStorage';
import getNextRoute from '../utils/getNextRoute';
import {APP_VERSION,GA_TRACKING_CODE} from '../constants';

export default class App extends Component {
  
   constructor(context,props){
     
     super(context,props);
     document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);

  }


  componentWillMount(){
     // check the status
     this.props.appInit(APP_VERSION);
  }

  onDeviceReady(){

    // ga tracking code
    try{
      window.ga.startTrackerWithId(GA_TRACKING_CODE);
    }
    catch(e){
      console.log(e);//handle errors
    }
    
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
    if('postId' in route) props.postId = route.postId;
    if('fields' in route) props.fields = route.fields;
    if('chatroomId' in route) props.chatroomId = route.chatroomId;
    if('key' in route) props.key = route.key || route.component.toString();
    return React.createElement(route.component, props);
  }

  render() {
    let component = AuthScreen;
    let key = 'auth-screen';
    
    if(window.localStorage.jwt){
  
      let user = loadState();
 
      if(user && user.authenticated){
        let route = getNextRoute(user);
        component = route.component;
        key = 'nextRoute';
      }
      else {
        component = MainScreen;
        key = 'main-screen';  
      }
      
    }
   
    key = generateNavigationKey(key);
    
    return (
        <Navigator initialRoute={{component,key}} renderPage={this.renderPage.bind(this)} />
      );
    }

 }
 