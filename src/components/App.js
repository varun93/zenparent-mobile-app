import React from 'react';
import {Navigator} from 'react-onsenui';
import {generateNavigationKey} from '../utils';
import MainScreen from '../screens/MainScreen';
import AuthScreen from '../screens/AuthScreen';
import APP_VERSION from '../constants';

// check for for the token, if not present make a request
export default class App extends React.Component {
  
   constructor(context,props){
     
     super(context,props);
     
     document.addEventListener('deviceready', this.onDeviceReady, false);
     // document.addEventListener('onCleverTapProfileSync', this.onCleverTapProfileSync, false);
     // document.addEventListener('onCleverTapProfileDidInitialize', this.onCleverTapProfileDidInitialize, false);
     // document.addEventListener('onCleverTapInAppNotificationDismissed', this.onCleverTapInAppNotificationDismissed, false);
     // deeplink handler
     // document.addEventListener('onDeepLink', this.onDeepLink, false);
     //push notification handler
     document.addEventListener('onPushNotification', this.onPushNotification, false);
  }

  componentWillMount(){
     this.props.appInit(APP_VERSION);
  }

  onDeviceReady(){
    CleverTap.notifyDeviceReady();
    CleverTap.registerPush();
    CleverTap.enablePersonalization();
  }

  onCleverTapProfileSync(e) {
        console.log(e.updates);
    }
    
  onCleverTapProfileDidInitialize(e) {
        
        CleverTap.profileSet({"Email" : "varun@i2india.in","Identity":"1854"});
        CleverTap.recordEventWithName("varun");
        // CleverTap.recordEventWithNameAndProps("boo", {"bar":"zoo"});
        console.log(e.CleverTapID);
    }
    
  onCleverTapInAppNotificationDismissed(e){
        console.log(e.extras);
        console.log(e.actionExtras);
    }
    
    // deep link handling
    onDeepLink(e) {
        console.log(e.deeplink);
    }
    
    // push notification payload handling
    onPushNotification(e) {
        
        //capture the intent of the push notification
        //if single article then open the view of a single article
        // alert(e.notification);
        console.log(e.notification);
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
 