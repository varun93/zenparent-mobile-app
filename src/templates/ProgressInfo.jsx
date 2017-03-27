import React from 'react';

const styles = {
	
	wrapper : {
		width : "100%",
		textAlign : "center"
	},
	container : {
	  width : "85px",
	  height : "85px",
	  background : "rgb(132,116,159)",
	  color : "white",
	  margin  : "0 auto",
	  position : "relative",
	  borderRadius : "50%"
	},
	label : {
	   position : "absolute", 
	   top : "40%",
	   left : "24%",
	   fontSize: "14px",
   	   fontWeight: "bold"
	},
	message : {
		fontSize : "14px"	
	}

};


const ProgressInfo =  ({user}) => {


	const message = () => {

		const stageOfParenting = user.stage_of_parenting;
		let blockOne = '',blockTwo = '';

		if(stageOfParenting == 'parent'){

			const months = user.kids_age_in_months;
			const years = Math.floor(months/12);

			if(months < 24){
				blockOne = `Month ${months}`;
				blockTwo = `Hey ${user.first_name}, your child is ${months > 1 ? `months` : `month`} old.`;
			}
			else{
				blockOne = `Year ${years}`;
				blockTwo = `Hey ${user.first_name}, your child is ${years}  ${years > 1 ? `years` : `year`} old.`;
			}
			
		}
		if(stageOfParenting == 'pregnant'){
			blockOne = `Week ${user.week_number}`;
			blockTwo = `Hey ${user.first_name}, you are ${40-user.week_number} weeks away from seeing your little one.`
		}

		return {blockOne,blockTwo};
	};

	const messages = message();

	return (
		<div style={styles.wrapper}>
			<div style={styles.container}>
	  			<div style={styles.label}>
	    			{messages.blockOne}
				</div>
			</div>
			<p style={styles.message}>{messages.blockTwo}</p>
		</div>
	)
};

export default ProgressInfo;
