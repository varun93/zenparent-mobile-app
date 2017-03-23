import React from 'react';
import classNames from 'classnames';
require('../styles/message.css');

const ChatMessageItem = ({item,currentUser,navigator}) => {

	const formatTime = () => {

		let time = new Date();

		if('time' in item){
		 	time = new Date(item.time*1000);
		}
	
		time = time.toDateString();
		return time;
	};

	const className = classNames('message', {
      'self' : (currentUser == item.user_id)   
    });

	return (
		<div className={className}>
			<div className="message-box">
				<span className="message-author">{item.user_name}</span>
				<span className="message-text">{item.chat_payload}</span>
				<span className="message-time">{formatTime()}</span>
			</div>
		</div>
		)
};

export default ChatMessageItem;
