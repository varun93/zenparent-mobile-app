import React from 'react';

// Api tests
import UserApi from '../api/UserApi';
import BlogApi from '../api/BlogApi';
import ChatroomApi from '../api/ChatroomApi';

// Action tests


import {updateUserProfile,loginUser,signupUser,tokenSignin,updateUserInterests} from '../actions/userActions';

import {fetchSinglePost,fetchPosts,likePost,bookmarkPost,
HOMEPAGE_POSTS,HOMEPAGE_SLOT_POSTS,PARENTING_CHILD_TAB_POSTS,PARENTING_MOTHER_TAB_POSTS,
PARENTING_FAMILY_TAB_POSTS
} from '../actions/blogActions';

import {joinChatroom,leaveChatroom,fetchChatroomMessages,fetchChatrooms,setActiveChatRoom} from '../actions/chatActions';

import { connect } from 'react-redux'

// check for for the token, if not present make a request
class ApiTest extends React.Component {
  	
  constructor(props,context){
  	super(props,context);
  	// this.apiTests();
    // this.blogActionReducersTest();
    // this.chatActionReducersTest();
  }

  //chat api test
  listMessagesTest(){

  	ChatroomApi.listMessages(124636).then(function(response){
  	console.log(response);
  		}
	);

  }
  	
  listChatGroupsTest(){

  	ChatroomApi.listChatrooms().then(function(response){
  		console.log(response);
  	});
  }

  joinGroupTest(){

  	ChatroomApi.joinChatroom(117798).then(function(response){
  		console.log(response);
  	});
  }


  leaveGroupTest(){

  	ChatroomApi.leaveChatroom(117798).then(function(response){
  		console.log(response);
  	});
  }


  //posts api test
  fetchPostsTest(){

  	BlogApi.fetchPosts('home','',0).then(function(response){
  		console.log(response);
  	});

  }

  fetchSinglePostTest(){
  	let postId = 125557;
  	BlogApi.fetchSinglePost(postId).then(function(response){
  		console.log(response);
  	});

  } 

  archivePostsTest(){

  	BlogApi.archivePosts('behaviour',0).then(function(response){
  		console.log(response);
  	});
  
  }
  
  postLikeTest(){

  	BlogApi.postLike(74527).then(function(response){
  		console.log(response);
  	});

  }

  postBookmarkTest(){
  	
  	BlogApi.postBookmark(74527).then(function(response){
  		console.log(response);
  	});

  }

  //user api test
  updateUserInterestsTest(){
  		let interests = ["health","lifestyle","health-issues","teens","toddlers","babies","teens","lifestyle","behaviour"];
  		UserApi.updateUserInterests(interests).then(function(response){
  			console.log(response);
  		});
  }

  updateUserProfileTest(){
  	let date = '',languagePreference = 'English',displayName = 'varunhegde93';
  	UserApi.updateUserProfile(date,languagePreference,displayName).then(function(response){
  		console.log(response);
  	});
  
  }

  emailSigninTest(){
 
  	let userEmail = 'varun@i2india.in';
  	UserApi.emailSignin(userEmail).then(function(response){
  		console.log(response);
  	});
  }

  //tested
  loginTest(){

  	let userEmail = 'varun@i2india.in';
  	let userPassword = 'Varun@123';

  	UserApi.login(userEmail,userPassword).then(function(response){
  		console.log(response);
  	});
  }


   signupTest(){
 
  	let userEmail = 'varun@i2india.in';
  	let userPassword = 'Varun@123';
  	
  	UserApi.signup(userEmail,userPassword).then(function(response){
  		console.log(response);
  	});
  }



  apiTests(){


	this.listMessagesTest();
	// this.listChatGroupsTest();
	// this.joinGroupTest();
	// this.leaveGroupTest();
	// this.fetchPostsTest();
	// this.archivePostsTest();
	// this.updateUserInterestsTest();
	// this.postLikeTest();
	// this.postBookmarkTest();
 	// this.updateUserProfileTest();
 	// this.loginTest();
 	// this.signupTest();
 	// this.fetchSinglePostTest();
 }

  blogActionReducersTest(){
    // this.testPosts();
  }

  chatActionReducersTest(){

      this.testSetActiveChatroom();

     this.testFetchChatrooms();

     this.testFetchChatroomMessages();

     // this.testJoinGroup();

     // this.testLeaveGroup();

    


  }

  // 125557
  testpostLike(){
    this.props.likePost(125557)
  }

  // 125557
  testpostBookmark(){
    this.props.bookmarkPost(125557)
  }

  testSinglePost(){
    this.props.fetchSinglePost(123746);
  }

  testPosts(){
    this.props.fetchPosts(HOMEPAGE_POSTS,'home','',0);
  } 


  testFetchChatrooms(){
    this.props.fetchChatrooms();
  }

  testFetchChatroomMessages(){
    // this.props.fetchChatroomMessages(124636);
  }

  testSetActiveChatroom(){
    // 125320
    // this.props.setActiveChatRoom(125320);

  }

  testJoinGroup(){
    // 117784
    this.props.joinChatroom(117779);
  }

  testLeaveGroup(){
    this.props.leaveChatroom(117779);
  }

  testLoginUser(){
    
    let userEmail = 'varun@i2india.in';
    let userPassword = 'Varun@123';
    
    this.props.login(userEmail,userPassword); 
 

  }

  testSignupUser(){

    let userEmail = 'varun@i2india.in';
    let userPassword = 'Varun@123';
    
    this.props.signup(userEmail,userPassword);

  } 

  testTokenSignin(){
    //cant be tested now!
  }

  testUpdateUserProfile(){
    
    let date = '',languagePreference = 'English',displayName = 'hegdevarun93';
    this.props.updateUserProfile(date,languagePreference,displayName);
    
  }

  testUpdateUserInterests(){
  
    let interests = ["teens","lifestyle","behaviour","babies"];
    this.props.updateUserInterests(interests);
  
  }

  render() {
    return (
      <div>
        No errors good going!
         <button onClick={(e) =>  this.testLoginUser() }>Login</button>
         <button onClick={(e) =>  this.testSignupUser() }>Signup</button>
         <button onClick={(e) =>  this.testUpdateUserProfile() }>Update Profile</button>
         <button onClick={(e) =>  this.testUpdateUserInterests() }>Update Interests</button>
         <button onClick={(e) => this.testPosts() }>Fetch Posts Test</button> 
      </div>)
  }

 }


const mapDispactorToProps = (dispatch) => {
  return {
    fetchSinglePost : (id) => dispatch(fetchSinglePost(id)),
    fetchPosts : (key,screen,tab,offset) => dispatch(fetchPosts(key,screen,tab,offset)),
    likePost : (id) => dispatch(likePost(id)),
    bookmarkPost : (id) => dispatch(bookmarkPost(id)),
    joinChatroom : (id) => dispatch(joinChatroom(id)),
    leaveChatroom : (id) => dispatch(leaveChatroom(id)),
    fetchChatrooms : () => dispatch(fetchChatrooms()),
    fetchChatroomMessages : (chatroomId,messageId,offset) => dispatch(fetchChatroomMessages(chatroomId,messageId,offset)),
    setActiveChatRoom : (chatroomId) =>  dispatch(setActiveChatRoom(chatroomId)),
    login : (userEmail,userPassword) => dispatch(loginUser(userEmail,userPassword)),
    signup : (userEmail,userPassword) => dispatch(signupUser(userEmail,userPassword)),
    tokenSignin : (accessToken,socialUniqueId,userEmail,loginBy) => dispatch(tokenSignin(accessToken,socialUniqueId,userEmail,loginBy)),
    updateUserProfile : (date,languagePreference,displayName) => dispatch(updateUserProfile(date,languagePreference,displayName)),
    updateUserInterests : (interests) => dispatch(updateUserInterests(interests))
  }};

const mapStateToProps = (state) => {
  return {
    loading :false,
    post : null,
    error : false
  }};

export default connect(mapStateToProps,mapDispactorToProps)(ApiTest)