import React from 'react';

const styles = {
	
	wrapper : {
		width : "100%",
		display : "table",
		background : "white"
	},
	container : {
	  width : "25%",
	  background : "rgb(132,116,159)",
	  color : "white",
	  textAlign : "center",
	  verticalAlign : "middle",
	  display : "table-cell",
	  padding : "15px"
	},
	message : {
		width : "75%",
		fontSize : "16px",
		textAlign : "center",
	  	verticalAlign : "middle",
		margin : "5px 0px !important",
		display : "table-cell"	
	}
};

const ProgressInfo =  ({user}) => {

	if(user === undefined || user == null){
		return null;
	}

	const message = () => {

		const stageOfParenting = user.stage_of_parenting;
		let blockOne = '',blockTwo = '';

		if(stageOfParenting == 'parent'){

			const months = user.kids_age_in_months;
			const years = Math.floor(months/12);
			const weeks = user.kids_age_in_weeks;

			if(months == 0){
				blockOne = `Week ${weeks}`;
				blockTwo = `Hey ${user.first_name}, your child is ${weeks} ${weeks > 1 ? `weeks` : `week`} old.`;
			}
			else if(months < 24){
				blockOne = `Month ${months}`;
				blockTwo = `Hey ${user.first_name}, your child is ${months} ${months > 1 ? `months` : `month`} old.`;
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
				{messages.blockOne}
			</div>
			<div style={styles.message}>
				{messages.blockTwo}
			</div>
		</div>
	)
};

export default ProgressInfo;
