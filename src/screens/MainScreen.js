import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {Tab,Tabbar,Navigator,Page} from 'react-onsenui';
import { connect } from 'react-redux';
import UserProfile  from  './UserProfile';
import HomeScreen from './HomeScreen';
import Community from './Community';
import Parenting from './Parenting';


class MainScreen extends Component {

    constructor(props, context){

      super(props, context);
    
      this.state = {
        index : 0
      };
    }


    renderTabs(currentIndex,tabbar){
    
    return [
        {
          content: <HomeScreen key='home-screen' user={this.props.user} navigator={this.props.navigator} title='Home' />,
          tab: <Tab key={0} label='Home' icon='md-home' />
        },
        {
          content: <Community  key='community' user={this.props.user} navigator={this.props.navigator} title='Community' />,
          tab: <Tab key={1} label='Community' icon='md-accounts' />
        },
        {
          content: <Parenting key='parenting' user={this.props.user} navigator={this.props.navigator} key={3} title='Parenting' />,
          tab: <Tab key={2} label='Parenting' icon='md-male-female' />
        },
        {
          content: <UserProfile key='user-profile' navigator={this.props.navigator} title='UserProfile' />,
          tab: <Tab key={4} label='UserProfile' icon='md-account' />
        },
        
      
      ];
    
    
  }

    render() {
      
          return (
            <Page>
              <Tabbar 
              index={this.state.index}
              initialIndex={0}
              onPreChange = {(event) => {
                if(event.index != this.state.index)
                {
                  this.setState({index : this.state.index})
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