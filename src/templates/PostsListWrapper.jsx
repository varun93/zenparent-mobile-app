import React from 'react';
import {List,ListHeader} from 'react-onsenui';
import ArticleCard from './ArticleCard';

const styles = {
	listHeader : {
		fontSize : "18px",
		color:"#FF547C",
		textAlign : "left",
		fontWeight : "bold"
	}
};

const PostsListWrapper = ({posts=[],position = 0,title='Stories For You',toggleLike,toggleBookmark,navigator}) => {
	
	const renderHeader = () => {
		return (
			<ListHeader><p style={styles.listHeader}>{title}</p></ListHeader>
			)
	};

	if(posts.length === 0){
		return null;
	}

	return (
		  <List 
                className="article-listing"
                dataSource={posts}
                calculateItemHeight={() => 120}
                renderRow={(post) => {return <ArticleCard toggleLike={toggleLike} toggleBookmark={toggleBookmark} key={post.id} post={post} navigator={navigator} />  }}
				renderHeader={() => renderHeader()}
				style={{marginTop : `${position}px`}}
			/>
		);	

};

export default PostsListWrapper;
