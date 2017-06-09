import MainScreen from '../screens/MainScreen';
import UserInterestsSelector from '../screens/UserInterestsSelector';
import ParentingStageInput from '../screens/ParentingStageInputScreen';
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import {v4} from 'node-uuid';
import {isProfileComplete} from '../utils';


const getNextRoute = (userInfo) => {

	if(userInfo){
		
		const profileComplete = isProfileComplete(userInfo); 
		const stageOfParenting = userInfo.stage_of_parenting;
		const interests = userInfo.interests;
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
		return {component,props};
	}
};

export default getNextRoute;