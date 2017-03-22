import React,{Component} from 'react';
import {Page,Toolbar,BackButton,Input} from 'react-onsenui';
import BookmarkedPostsContainer from '../containers/BookmarkedPostsContainer';
import AuthScreen from '../screens/AuthScreen';
import {removeCache} from '../utils/cachedFetch';
import {PROFILE_UPDATE} from '../constants';
import {assetsBase} from '../constants';
import {hasUserInfoChanged,convertDateToWords,isFieldEmpty,ucFirstLetter,generateNavigationKey,validateDate} from '../utils';
require('../styles/user-profile.css');

// move the rest to utils
const styles = {
  profileImage : {
    display:"block",
    height: "100px",
    maxWidth: "100px",
    marginLeft : "auto",
    marginRight : "auto",
    borderRadius : "50%",
    marginBottom: "10px"
  },
  logoutButton : {
    textAlign:"right",
    color:"rgb(132,116,159)"
  },
  stageOfParentingSelect : {
    padding: "10px 0px 10px",
    width: "100%",
    fontSize : "14px",
    fontWeight : "bold"
  }
};


export default class UserProfile extends Component{

  constructor(props,context){
    super(props,context);
  
    this.state = {
      editMode : 0,
      profileImage : '',
      displayName : '',
      stageOfParenting : '',
      date : ''
    }

  }


 componentWillReceiveProps(nextProps) {

    if(!this.props.user.authenticated) {
      return;
    }

    if(hasUserInfoChanged(this.props.user.userInfo,nextProps.user.userInfo)){
      this.props.syncFeed();
    }

  }

  toggleEdit(){

    let userInfo = this.props.user.userInfo;

    let stageOfParenting = userInfo.stage_of_parenting;
    let displayName = userInfo.first_name;
    let date = null;
    let profileImage = userInfo.user_avatar;

    if(stageOfParenting == 'parent'){
      date = userInfo.dob;
    }
    if(stageOfParenting == 'pregnant'){
      date = userInfo.due_date;
    } 

    this.setState({editMode : !this.state.editMode,displayName : displayName,stageOfParenting : stageOfParenting,date : date,profileImage : profileImage});
  }
  
  getImage() {
      navigator.camera.getPicture(this.uploadPhoto, function(message) {
      alert('get picture failed');
    },{
      quality: 100,
      destinationType: navigator.camera.DestinationType.FILE_URI,
      sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
    });
  }

  updateProfileInfo(){
    let {date,stageOfParenting,displayName} = this.state;

    // make sure the all the fields are field 

    // console.log(this.state.date);
    // console.log(this.state.stageOfParenting);
    // console.log(this.state.displayName)

    // console.log("Is date empty " + isFieldEmpty(date).toString());
    // console.log("Is name empty " + isFieldEmpty(displayName).toString());
    // console.log("Is stageOfParenting empty " + isFieldEmpty(stageOfParenting).toString());

    if(isFieldEmpty(stageOfParenting) || isFieldEmpty(date) || isFieldEmpty(displayName) || !validateDate(date)){
      return;
    }
    
    //change to edit mode
    this.setState({editMode : !this.state.editMode});
    //remove any user profile related info
    removeCache(PROFILE_UPDATE);
    // finally make the request
    this.props.updateUserProfile(date,stageOfParenting,displayName);

  }

  uploadPhoto(imageURI) {
 
       document.getElementById("profileImage").src = imageURI;
       var options = new FileUploadOptions();
       options.fileKey = "file";
       options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
       options.mimeType = "image/jpeg";
       var params = new Object();
       params.value1 = "test";
       params.value2 = "param";
       options.params = params;
       options.chunkedMode = false;
                                                                                                                           
       var ft = new FileTransfer();
       ft.upload(imageURI, "http://192.168.3.46/phonegap_uploads/upload.php", function(result){
          console.log(JSON.stringify(result));
       }, function(error){
          console.log(JSON.stringify(error));
       }, options);
 
 }

  logout(){
    this.props.logout();
  }

  _onStageOfParentingChanged(e){
   this.setState({stageOfParenting : e.target.value});
  }

  _onDisplayNameChanged(e){
    this.setState({displayName : e.target.value});
  }

  _onDateChanged(e){
    this.setState({date : e.target.value}); 
  }

  render(){

    const {user} = this.props;
    const authenticated = user.authenticated;
 
    let stageOfParenting = (authenticated ? user.userInfo.stage_of_parenting : '');
    let displayName = (authenticated ? user.userInfo.first_name : '');
    let date = (authenticated ? (stageOfParenting == 'parent' ? user.userInfo.dob : user.userInfo.due_date) : '');
    let profileImage = (authenticated ? user.userInfo.user_avatar : 'https://placehold.it/100x100' );
   
    return (
    <Page className="user-profile">

      <div className="profile-info">

        <div className="logout-section" onClick={this.logout.bind(this)}>
          <p style={styles.logoutButton}>LOGOUT</p>
        </div>
        
        <div className="profile-image-wrap">
            <img style={styles.profileImage} src={profileImage} className="profile-image" />
        </div>

        <div className="profile-name">
          <p>{displayName}</p>
        </div>

        <div style={!this.editMode ?  {padding: "0px 25px"} : {padding: "0px"}} className="profile-form">
          {
           !this.state.editMode ?
            <div className="form-edit">
            <button onClick={this.toggleEdit.bind(this)} className="btn-edit">
              <img src={`${assetsBase()}edit_white_goedgh.svg`} />
                EDIT
             </button>
            </div> 
             :
            ''
         }

          <div className="divider">
            <hr />
          </div>

          <div className="profile-fields">

            <div className="display-name">
              <p className="field-label">Name</p>
              {
               !this.state.editMode ? 
               <p>{displayName}</p>  : 
                <p>
                  <Input
                    onChange={this._onDisplayNameChanged.bind(this)}
                    modifier="underbar"
                    type="text"
                    value={this.state.displayName}
                    className="user-name"
                    float />
                </p>

              }
            </div>

            <div className="parenting-stage">
             <p className="field-label">Parenting Stage</p>
              {
               !this.state.editMode ? 
               <p>{stageOfParenting}</p> : 
               <p>
                <select value={this.state.stageOfParenting}  onChange={this._onStageOfParentingChanged.bind(this)} style={styles.stageOfParentingSelect}>
                  <option value="parent">Parent</option>
                  <option value="pregnant">Pregnant</option>
                 </select>
               </p>
              }
            </div>

            <div className="date">
              <p className="field-label">
                {stageOfParenting == 'parent' ?  'Date of Birth' : 'Due Date'}
              </p>
              {
               !this.state.editMode ?  
                <p>{convertDateToWords(date)}</p> : 
                <p>
                  <Input
                    onChange={this._onDateChanged.bind(this)}
                    type="date"
                    modifier="underbar"
                    className="date"
                    value={this.state.date}
                    float />
                </p>
              }
            </div>

            {
              this.state.editMode ?  
              <p>
                <button onClick={this.updateProfileInfo.bind(this)} className="save-info">Save</button>
              </p> :
              ''
            }
      
          </div>

        </div>
      
      </div>

      <div className="saved-articles">
       <BookmarkedPostsContainer  navigator={this.props.navigator} />
      </div>

    </Page>
  )

  }
}