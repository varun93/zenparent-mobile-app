import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {Tab,Tabbar,Navigator,Page} from 'react-onsenui';
import { connect } from 'react-redux';
import UserProfile  from  './UserProfile';
import HomeScreen from './HomeScreen';
import Community from './Community';
import Parenting from './Parenting';
import {BlogAnalytics} from '../utils/Analytics';
import {SCREEN_VIEWED} from '../constants';
import {v4} from 'node-uuid';

class MainScreen extends Component {

    constructor(props, context){

      super(props, context);
    
      this.state = {
        index : 0
      };
    }

    componentDidMount(){
      try{
        this.recordScreenViews(0);  
      }
      catch(e){
        //handle errors
      }
      
    }

    recordScreenViews(index){
      
      let screen = '';
      switch(index){
        case 0 : 
          screen = 'Home'
          break;
        case 1 : 
          screen = 'Community';
          break;
        case 2 :
          screen = 'Parenting';
          break;
        case 3 : 
          screen = 'UserProfile';
          break;
      }

      try{
        BlogAnalytics(SCREEN_VIEWED,null,screen);
      }
      catch(e){
        //handle the error
      }
     

    }

    renderTabs(currentIndex,tabbar){
    
      return [
          {
            content: <HomeScreen active={this.state.index == 0}  key='home-screen' user={this.props.user} navigator={this.props.navigator} title='Home' />,
            tab: <Tab key={v4()} className="tab home-tab" label='You' icon='' />
          },
          {
            content: <Community  key='community' active={this.state.index == 1} user={this.props.user} navigator={this.props.navigator} title='Community' />,
            tab: <Tab key={v4()} className="tab community-tab" label='Community' icon='' />
          },
          {
            content: <Parenting key='parenting' active={this.state.index == 2} user={this.props.user} navigator={this.props.navigator} key={3} title='Parenting' />,
            tab: <Tab key={v4()}  className="tab parenting-tab" label='Parenting' icon='' />
          },
          {
            content: <UserProfile key='user-profile' active={this.state.index == 3} navigator={this.props.navigator} title='UserProfile' />,
            tab: <Tab key={v4()} className="tab user-profile-tab" label='Profile' icon='' />
          }
          
        
        ];
    
    
  }

    // set analytics
    render() {
      
          return (
            <Page key={v4()}>
              <Tabbar 
              className="main-tabs"
              index={this.state.index}
              initialIndex={0}
              onPreChange = {(event) => {
                if(event.index != this.state.index)
                {
                  this.recordScreenViews(event.index);
                  this.setState({index : event.index})
                }
              }}
              renderTabs={this.renderTabs.bind(this)}/>
            </Page>
          )
  }

}


const mapStateToProps = (state) => {
  
  return {
    user  : state.user  
  }
};

export default connect(mapStateToProps, null)(MainScreen);