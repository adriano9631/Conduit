import React, { Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { setCurrentPageNumberToFirst } from 'redux/common/common.actions';
import { fetchArticlesByMostRecentRequest } from 'redux/articleList/articleList.actions';

import HomePage from 'pages/HomePage/HomePage';
import ArticleAuthorProfilePage from 'pages/ArticleAuthorProfilePage/ArticleAuthorProfilePage';
import UserProfilePage from 'pages/UserProfilePage/UserProfilePage';
import ArticleOverviewPage from 'pages/ArticleOverviewPage/ArticleOverviewPage';
import UserSettingsPage from 'pages/UserSettingsPage/UserSettingsPage';
import ArticleCreationPage from 'pages/ArticleCreationPage/ArticleCreationPage';
import EditArticlePage from 'pages/EditArticlePage/EditArticlePage';
import LoginPage from 'pages/LoginPage/LoginPage';
import SignUpPage from 'pages/SignUpPage/SignUpPage';
import Navbar from 'components/Navbar/Navbar';
import NotFound from 'components/NotFound/NotFound';
import PrivateRoute from 'components/PrivateRoute/PrivateRoute';

function App({ currentUserData, isAuth, setCurrentPageNumberToFirst, fetchArticlesByMostRecentRequest }) {
	return (
		<Fragment>
			<Navbar
				currentUserData={currentUserData}
				isAuth={isAuth}
				setCurrentPageNumberToFirst={setCurrentPageNumberToFirst}
				fetchArticlesByMostRecentRequest={fetchArticlesByMostRecentRequest}
			/>
			<Switch>
				{[ '/', '/page/:currentPageNumber' ].map((path) => (
					<Route exact key={path} path={path}>
						<HomePage />
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
				<Route path="/articleAuthorProfile/:username">
					<ArticleAuthorProfilePage />
				</Route>
				<PrivateRoute path="/userSettings">
					<UserSettingsPage />
				</PrivateRoute>
				<PrivateRoute path="/createNewArticle">
					<ArticleCreationPage />
				</PrivateRoute>
				<PrivateRoute path="/editArticle/:articleSlug">
					<EditArticlePage />
				</PrivateRoute>
				<PrivateRoute path="/userProfile/:username">
					<UserProfilePage />
				</PrivateRoute>
				<Route path="*">
					<NotFound>404 Page Not Found</NotFound>
				</Route>
			</Switch>
		</Fragment>
	);
}

const mapStateToProps = (state) => ({
	currentUserData: state.user.currentUserData,
	isAuth: state.user.isAuth
});

const mapDispatchToProps = (dispatch) => ({
	setCurrentPageNumberToFirst: () => dispatch(setCurrentPageNumberToFirst()),
	fetchArticlesByMostRecentRequest: () => dispatch(fetchArticlesByMostRecentRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
