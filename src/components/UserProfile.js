import React,{Component} from 'react';
import {Page,Toolbar,BackButton,Input,Icon,Dialog,Button} from 'react-onsenui';
import LanguageSelect from '../templates/LanguageSelect';
import {platform} from 'onsenui';
import BookmarkedPostsContainer from '../containers/BookmarkedPostsContainer';
import AuthScreen from '../screens/AuthScreen';
import {PROFILE_UPDATE} from '../constants';
import {assetsBase} from '../constants';
import {hasUserInfoChanged,convertDateToWords,isFieldEmpty,ucFirstLetter} from '../utils';
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
  logoutSection : {
    textAlign  : "right"
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
      showDateField : platform.isIOS() ? 1 : 0,
      profileImage : '',
      displayName : '',
      languagePreference : 'English',
      stageOfParenting : '',
      date : '',
      dialogShown : false,
      errorMessage : ''
    };

  }


  toggleEdit(){

    let userInfo = this.props.user.userInfo;

    let stageOfParenting = userInfo.stage_of_parenting;
    let displayName = userInfo.first_name;
    let languagePreference = userInfo.language_preference;
    let date = null;
    let profileImage = userInfo.user_avatar;

    if(stageOfParenting == 'parent'){
      date = userInfo.dob;
    }
    if(stageOfParenting == 'pregnant'){
      date = userInfo.due_date;
    } 

    this.setState({editMode : !this.state.editMode,displayName : displayName,stageOfParenting : stageOfParenting,date : date,profileImage : profileImage,languagePreference : languagePreference});
  }


  uploadPhoto(imageURI) {
       this.props.uploadUserProfilePic(imageURI);
   }

  hideDialog(){
    this.setState({dialogShown: false});
  }

  
  getImage() {

    let classContext = this;
    
    navigator.camera.getPicture(classContext.uploadPhoto.bind(classContext), function(message) {
      alert('Get Picture failed');
     } ,{
      quality : 50,
      destinationType : navigator.camera.DestinationType.DATA_URL,
      sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
    });
  
  }

  validateDate(stageOfParenting,date){

    let valid = true;
    if((stageOfParenting == 'pregnant' && (new Date(date).getTime() < new Date().getTime())) || (stageOfParenting == 'parent' && (new Date(date).getTime() > new Date().getTime()))){
      valid = false;
    }    
    return valid;
  }

  updateProfileInfo(){

    let {date,stageOfParenting,displayName,languagePreference} = this.state;
    let errorMessage = '';
    let valid = true;

    if(valid  && isFieldEmpty(displayName)){
      errorMessage = 'Display Name cannot be empty';
      valid = false;
    }

    if(valid && isFieldEmpty(date)){
       errorMessage = 'Date field cannot be empty';
       valid = false;
    }

    if(valid && !this.validateDate(stageOfParenting,date)){
      errorMessage = `Please select a valid ${stageOfParenting  == 'parent' ? `Date of Birth` : `Due Date`}`;
      valid = false;
    }

    if(!valid){
      this.setState({errorMessage : errorMessage,dialogShown : true})
    }
    else{
        // finally make the request
        this.props.updateUserProfile(date,stageOfParenting,displayName,languagePreference);    
    }
  
  }

  logout(){
    this.props.logout(); 
    this.props.navigator.resetPage({component : AuthScreen});
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

  _onLanguageChange(e){
    const languagePreference = e.target.value;
    this.setState({languagePreference});
    }


  render(){

    const {user} = this.props;
    const authenticated = user.authenticated;
    const editMode = this.state.editMode;
    const loading = user.loading;

    let stageOfParenting = editMode ? this.state.stageOfParenting : (authenticated ? user.userInfo.stage_of_parenting : '');
    let displayName = editMode ? this.state.displayName : (authenticated ? user.userInfo.first_name : '');
    let languagePreference = editMode ? this.state.languagePreference : (authenticated ? user.userInfo.language_preference : '');
    let date = editMode ? this.state.date : (authenticated ? (stageOfParenting == 'parent' ? user.userInfo.dob : user.userInfo.due_date) : '');
    let profileImage = (authenticated ? user.userInfo.user_avatar ? user.userInfo.user_avatar : 'https://lorempixel.com/100/100/people/' : '');


    return (

    <Page className="user-profile">

      <Dialog
              isOpen={this.state.dialogShown}
              isCancelable={true}
              onCancel={this.hideDialog.bind(this)}>
              <div style={{textAlign: 'center', margin: '20px'}}>
              <p style={{opacity: 0.5,color:'red'}}>{this.state.errorMessage}</p>
              <p>
                <Button onClick={this.hideDialog.bind(this)}>Close</Button>
              </p>
            </div>
      </Dialog>


      <div className="profile-info">

        <div style={styles.logoutSection} className="logout-section">
          <span onClick={this.logout.bind(this)} style={styles.logoutButton}>LOGOUT</span>
        </div>
        
        <div className="profile-image-wrap">
            <img id="profileImage" style={styles.profileImage} src={profileImage} className="profile-image" />
        </div>

        <div className="profile-name">
          <p>{displayName}</p>
        </div>

        <div style={{padding: "0px 25px"}} className="profile-form">
          {
           !editMode ?
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
               !editMode ? 
               <p>{displayName}</p>  : 
                <p>
                  <Input
                    onChange={this._onDisplayNameChanged.bind(this)}
                    modifier="underbar"
                    type="text"
                    value={displayName}
                    className="user-name"
                    float />
                </p>

              }
            </div>

            <div className="language-preference">
             <p className="field-label">Language Preference</p>
             {   
               !editMode ? 
                <p>{languagePreference}</p> : 
                <LanguageSelect languagePreference={languagePreference} onLanguageChange={this._onLanguageChange.bind(this)} />
                }
            </div>

            <div className="parenting-stage">
             <p className="field-label">Parenting Stage</p>
              {
               !editMode ? 
               <p>{stageOfParenting}</p> : 
               <p>
                <select value={stageOfParenting}  onChange={this._onStageOfParentingChanged.bind(this)} style={styles.stageOfParentingSelect}>
                  <option value="parent">Parent</option>
                  <option value="pregnant">Pregnant</option>
                  <option value="trying">Trying</option>
                 </select>
               </p>
              }
            </div>

            <div className="date">
              <p className="field-label">
                {stageOfParenting == 'parent' ?  'Date of Birth' : stageOfParenting == 'pregnant' ?  'Due Date' : 'Last Mentrual Period'}
              </p>
              {
               !this.state.editMode ?  
                <p>{convertDateToWords(date)}</p> : 
                <p>
                {this.state.showDateField ?

                  <Input
                    onChange={this._onDateChanged.bind(this)}
                    type="date"
                    onBlur = {() => this.setState({showDateField : platform.isIOS()})}
                    modifier="underbar"
                    className="date"
                    value={this.state.date} /> :

                    <Input
                      type="text"
                      onFocus={() => this.setState({showDateField : true})}
                      modifier="underbar"
                      value={date} />
                }
                  
                  </p>
              }
            </div>

            {
              this.state.editMode ?  
              <p>
                <button onClick={this.updateProfileInfo.bind(this)} className="save-info">
                {loading ? <Icon style={{color: 'white'}} size={24} spin icon='md-spinner'/> : `Save`}
                </button>
              </p> :
              ''
            }
      
          </div>

        </div>
      
      </div>

      <div className="saved-articles">
       <BookmarkedPostsContainer active={this.props.active} navigator={this.props.navigator} />
      </div>

    </Page>
  )

  }
}