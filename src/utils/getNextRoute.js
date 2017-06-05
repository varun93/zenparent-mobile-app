import MainScreen from '../screens/MainScreen';
import UserInterestsSelector from '../screens/UserInterestsSelector';
import ParentingStageInput from '../screens/ParentingStageInputScreen';
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import {v4} from 'node-uuid';


const getNextRoute = (userInfo) => {

	if(userInfo){
		
		const stageOfParenting = userInfo.stage_of_parenting;
		const interests = userInfo.interests;
		const profileComplete  = stageOfParenting && interests.length; 
		let component = null;

		if(profileComplete){
			component = MainScreen;
		}
		else{
			if(!stageOfParenting.length){
				component = ParentingStageInput;
			}
			else if(!interests.length){
				component = UserInterestsSelector;
			}
		}
		let props = {};
		props['key'] =  v4();
		return Object.assign({},{component},{props});

	}
	
};

export default getNextRoute;