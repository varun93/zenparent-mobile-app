import React,{Component} from 'react';
import {Navigator} from 'react-onsenui';
import {generateNavigationKey} from '../utils';
import MainScreen from '../screens/MainScreen';
import AuthScreen from '../screens/AuthScreen';
import {loadState} from '../utils/localStorage';
import getNextRoute from '../utils/getNextRoute';
import {v4} from 'node-uuid';
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
    props.key = v4();
    return React.createElement(route.component, props);
  }

  render() {
    let component = AuthScreen;
   
    
    if(window.localStorage.jwt){
  
      let user = loadState();
 
      if(user && user.authenticated){
        const userInfo = user.userInfo;
        let route = getNextRoute(userInfo);
        component = route.component;
      }
      else {
        component = AuthScreen;
      }
      
    }
    
    const key = v4();
    
    return (
        <Navigator initialRoute={{component,key}} renderPage={this.renderPage.bind(this)} />
      );
    }

 }
 