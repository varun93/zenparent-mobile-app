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

     // document.addEventListener('onCleverTapInAppNotificationDismissed', this.onCleverTapInAppNotificationDismissed, false);
     // deeplink handler
     document.addEventListener('onDeepLink', this.onDeepLink, false);
     //push notification handler
     document.addEventListener('onPushNotification', this.onPushNotification, false);
  }


  componentWillMount(){
     // check the status
     this.props.appInit(APP_VERSION);
  }

  onDeviceReady(){

    try{
      window.ga.startTrackerWithId(GA_TRACKING_CODE);
    }
    catch(e){
      console.log(e);//handle errors
    }
    
 }

  onCleverTapInAppNotificationDismissed(e){
        console.log(e.extras);
        console.log(e.actionExtras);
  }
    
    // deep link handling
    onDeepLink(e) {
        // console.log("In deeplink");
        // console.log(JSON.stringify(e.deeplink));
    }
    
    // push notification payload handling
    onPushNotification(e) {
        // console.log("In Push Notifcation Screen");
        // console.log(JSON.stringify(e.notification));
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
  
      let user = loadState();
   
      if(user && user.authenticated){
        let route = getNextRoute(user);
        console.log(route);
        component = route.component;
        key = 'nextRoute';
      }
      else{
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
 