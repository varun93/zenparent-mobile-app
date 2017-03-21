import MainScreen from '../screens/MainScreen';
import UserInterestsSelector from '../screens/UserInterestsSelector';
import ParentingStageInput from '../screens/ParentingStageInputScreen';
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import {generateNavigationKey} from './index';

const getNextRoute = (user) => {

	let component = null,key = '';
	const status = user.status;
	const authenticated = user.authenticated;

	if(authenticated){
		
		const userInfo = user.userInfo;
		const stageOfParenting = userInfo.stage_of_parenting;
		const interests = userInfo.interests;
		const profileComplete  = stageOfParenting && interests.length; 

		if(profileComplete){
			component = MainScreen;
			key = 'main-screen';
		}
		else{
			if(!stageOfParenting.length){
				component = ParentingStageInput;
				key = 'parenting-stage-input';
			}
			else if(!interests.length){
				component = UserInterestsSelector;
				key = 'user-interests-selector-screen';
			}
		}
	}
	else{

		if(status == 'registered'){
			component = LoginScreen;
			key = 'login-screen';
		}
		if(status == 'new-user'){
			component = SignupScreen;
			key = 'signup-screen';
		}

	}

	let props = {};
	props['key'] =  generateNavigationKey(key);
	return Object.assign({},{component},{props});
};


export default getNextRoute;