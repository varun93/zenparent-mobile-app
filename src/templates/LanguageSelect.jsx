import React from 'react';

const styles = {

  languagePreferenceSelect : {
    padding: "10px 0px 10px",
    width: "100%",
    fontSize : "14px",
    fontWeight : "bold"
  }

};


const LanguageSelect = ({languagePreference,onLanguageChange}) => {

	return (
		<p>
			<select onChange={(e)=>onLanguageChange(e)} style={styles.languagePreferenceSelect} value={languagePreference}>
				<option value="English">English</option>
		        <option value="Hindi">Hindi</option>
		    </select>
	    </p>
	);

};


export default LanguageSelect