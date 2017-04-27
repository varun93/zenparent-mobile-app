import React from 'react';
import {Switch} from 'react-onsenui';

const styles = {

  languageSwitchWrapper : {
	  	position : "relative",
	  	textAlign : "right",
	  	display : "table-cell",
	  	verticalAlign : "middle",
	  	paddingRight: "5px"
	},
  languageSwitch : {
  	position : "relative"
  },
  languageText : {
  	position : "absolute",
  	zIndex : "100",
  	right: "30px",
    color: "rgb(132, 116, 159)",
    bottom: "13px"
  }

};


const LanguageSwitch = ({languagePreference,handleChange,disable}) => {

	languagePreference = (languagePreference == "English") ? "हिंदी" : "English";

	return (
		<div style={styles.languageSwitchWrapper}>
			<Switch disabled={disable} checked={languagePreference == "English" ? true : false} onChange={(e) => handleChange(e)} style={styles.languageSwitch}/>
		    <div style={styles.languageText}>
		    	{languagePreference}
		    </div>
	    </div>
	);

};

export default LanguageSwitch