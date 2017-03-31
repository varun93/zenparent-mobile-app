import React, { Component } from 'react';
import { connect } from 'react-redux';
import { appInit } from '../actions/userActions';
import App from '../components/App';


const mapDispatchToProps = (dispatch) => {
  
  return {
    appInit : (appVersion) => dispatch(appInit(appVersion))  
  }
};

export default connect(null, mapDispatchToProps)(App);