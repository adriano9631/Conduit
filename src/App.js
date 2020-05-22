import React, { Fragment } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { AnimatePresence } from 'framer-motion';

import { fetchArticlesByMostRecentRequest } from 'redux/articleList/articleList.actions';

import MainPage from 'pages/MainPage/MainPage';
import ProfilePage from 'pages/ProfilePage/ProfilePage';
import ArticleOverviewPage from 'pages/ArticleOverviewPage/ArticleOverviewPage';
import CurrentUserSettingsPage from 'pages/CurrentUserSettingsPage/CurrentUserSettingsPage';
import ArticleCreationPage from 'pages/ArticleCreationPage/ArticleCreationPage';
import EditArticlePage from 'pages/EditArticlePage/EditArticlePage';
import LoginPage from 'pages/LoginPage/LoginPage';
import SignUpPage from 'pages/SignUpPage/SignUpPage';
import Navbar from 'components/Navbar/Navbar';
import NotFound from 'components/NotFound/NotFound';
import PrivateRoute from 'components/PrivateRoute/PrivateRoute';

function App({ currentUserData, isAuth, fetchArticlesByMostRecentRequest }) {
	return (
		<Fragment>
			<Navbar
				currentUserData={currentUserData}
				isAuth={isAuth}
				fetchArticlesByMostRecentRequest={fetchArticlesByMostRecentRequest}
			/>
			<AnimatePresence>
				<Switch>
					{[ '/', '/page/:currentPageNumber', '/tag/:tag', '/tag/:tag/:currentPageNumber' ].map((path) => (
						<Route exact key={path} path={path}>
							<MainPage />
						</Route>
					))}
					<Route path="/login">
						<LoginPage />
					</Route>
					<Route path="/signUp">
						<SignUpPage />
					</Route>
					<Route path="/article/:articleSlug">
						<ArticleOverviewPage />
					</Route>
					<Route path="/profile/:username">
						<ProfilePage />
					</Route>
					<PrivateRoute path="/userSettings">
						<CurrentUserSettingsPage />
					</PrivateRoute>
					<PrivateRoute path="/createNewArticle">
						<ArticleCreationPage />
					</PrivateRoute>
					<PrivateRoute path="/editArticle/:articleSlug">
						<EditArticlePage />
					</PrivateRoute>
					<Route path="*">
						<NotFound>404 Page Not Found</NotFound>
					</Route>
				</Switch>
			</AnimatePresence>
		</Fragment>
	);
}

const mapStateToProps = (state) => ({
	currentUserData: state.user.currentUserData,
	isAuth: state.user.isAuth
});

const mapDispatchToProps = (dispatch) => ({
	fetchArticlesByMostRecentRequest: () => dispatch(fetchArticlesByMostRecentRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
