export const loadState = () => {
	
	try{
		const serializedState = window.localStorage.getItem('state');
		if(serializedState === null){
			return undefined;
		} 
		return JSON.parse(serializedState);
	}
	catch(e){
		return undefined;
	}

};

export const saveState = (user) => {

	if(!user.authenticated) return;

	try{
		const serializedState = JSON.stringify(user);
		window.localStorage.setItem('state',serializedState)
	}
	catch(e){
		// log the errors
	}

};