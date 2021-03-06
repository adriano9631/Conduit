import React, { useEffect, Fragment } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import {
	fetchArticlesByAuthorRequest,
	fetchFavoriteArticlesRequest,
	unloadArticles
} from 'redux/articleList/articleList.actions';

import Profile from 'components/Profile/Profile';
import NotFound from 'components/NotFound/NotFound';

function UserProfilePage({
	currentUserData,
	articleList,
	error,
	fetchArticlesByAuthorRequest,
	fetchFavoriteArticlesRequest,
	unloadArticles
}) {
	const { username } = useParams();
	let location = useLocation();

	useEffect(() => {
		if (location.pathname.includes('favorites')) {
			fetchFavoriteArticlesRequest(username);
		} else fetchArticlesByAuthorRequest(username);

		return () => {
			unloadArticles();
		};
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<Fragment>
			{error && <NotFound />}
			<Profile
				profileData={currentUserData}
				articleList={articleList}
				fetchArticlesByAuthorRequest={fetchArticlesByAuthorRequest}
				fetchFavoriteArticlesRequest={fetchFavoriteArticlesRequest}
				unloadArticles={unloadArticles}
				path={location.pathname}
			/>
		</Fragment>
	);
}

const mapStateToProps = (state) => {
	const { currentUserData, error } = state.user;
	const { articleList } = state.articleList;
	return {
		currentUserData,
		error,
		articleList
	};
};

const mapDispatchToProps = (dispatch) => ({
	fetchArticlesByAuthorRequest: (username) => dispatch(fetchArticlesByAuthorRequest(username)),
	fetchFavoriteArticlesRequest: (username) => dispatch(fetchFavoriteArticlesRequest(username)),
	unloadArticles: () => dispatch(unloadArticles())
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfilePage);
