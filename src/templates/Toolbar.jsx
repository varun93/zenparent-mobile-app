import React from 'react';
import {Toolbar,BackButton} from 'react-onsenui';

const ToolbarWrapper = ({title,navigator}) => {

	return (
		<Toolbar>
	          <div style={{width:"65%"}} className="center">
	           {title}
	          </div>
	          <div style={{width:"15%"}} className="left">
	            <BackButton onClick={() => navigator.popPage() }></BackButton>
	          </div>  
	    </Toolbar>
	)
		
};

export default ToolbarWrapper;