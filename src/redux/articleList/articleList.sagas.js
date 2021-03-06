import { all, put, call, takeLatest } from 'redux-saga/effects';

import articlesTypes from './articleList.types';
import * as articlesActions from './articleList.actions';
import * as api from './articleList.api';

function* fetchArticlesByMostRecentAsync(action) {
	try {
		const response = yield call(api.fetchArticlesFromAPI, action.offSet);
		yield put(articlesActions.fetchArticlesByMostRecentDone(response.data.articles, response.data.articlesCount));
	} catch (error) {
		yield put(articlesActions.fetchArticlesByMostRecentError(error));
	}
}

function* fetchArticlesByAuthorAsync(action) {
	try {
		const response = yield call(api.fetchArticlesByAuthorFromAPI, action.username);
		yield put(articlesActions.fetchArticlesByAuthorDone(response.data.articles));
	} catch (error) {
		yield put(articlesActions.fetchArticlesByAuthorError(error));
	}
}

function* fetchFavoriteArticlesAsync(action) {
	try {
		const response = yield call(api.fetchFavoriteArticlesFromAPI, action.username);
		yield put(articlesActions.fetchFavoriteArticlesDone(response.data.articles));
	} catch (error) {
		yield put(articlesActions.fetchFavoriteArticlesError(error));
	}
}

function* fetchArticlesByTagAsync(action) {
	const { tag, offSet } = action;
	try {
		const response = yield call(api.fetchArticlesByTagFromAPI, tag, offSet);
		yield put(articlesActions.fetchArticlesByTagDone(response.data.articles, response.data.articlesCount));
	} catch (error) {
		yield put(articlesActions.fetchArticlesByTagError(error));
	}
}

function* updateFavoriteArticlesAsync(action) {
	const { articleSlug, isFavorited, favoritesCount } = action;
	console.log(action)
	try {
		if (isFavorited) {
			yield put(articlesActions.updateFavoriteArticlesDone(articleSlug, false, favoritesCount - 1));
			yield call(api.removeArticleFromFavoritesFromApi, articleSlug);
		} else {
			yield put(articlesActions.updateFavoriteArticlesDone(articleSlug, true, favoritesCount + 1));
			yield call(api.addArticleToFavoritesInApi, articleSlug);
		}
	} catch (error) {
		yield put(articlesActions.updateFavoriteArticlesError(error));
	}
}

/* 
function* addArticleToFavoritesAsync(action) {
	try {
		yield put(
			articlesActions.addArticleToFavoritesDone(action.articleSlug, action.isFavorited, action.favoritesCount)
		);
		yield call(api.addArticleToFavoritesInApi, action.articleSlug);
	} catch (error) {
		yield put(articlesActions.addArticleToFavoritesError(error));
	}
}

function* removeArticleFromFavoritesAsync(action) {
	try {
		yield put(
			articlesActions.removeArticleFromFavoritesDone(
				action.articleSlug,
				action.isFavorited,
				action.favoritesCount
			)
		);
		yield call(api.removeArticleFromFavoritesFromApi, action.articleSlug);
	} catch (error) {
		yield put(articlesActions.removeArticleFromFavoritesError(error));
	}
} */

export default function* watchArticlesSaga() {
	yield all([
		yield takeLatest(articlesTypes.FETCH_ARTICLES_BY_MOST_RECENT_REQUEST, fetchArticlesByMostRecentAsync),
		yield takeLatest(articlesTypes.FETCH_ARTICLES_BY_AUTHOR_REQUEST, fetchArticlesByAuthorAsync),
		yield takeLatest(articlesTypes.FETCH_FAVORITE_ARTICLES_REQUEST, fetchFavoriteArticlesAsync),
		yield takeLatest(articlesTypes.FETCH_ARTICLES_BY_TAG_REQUEST, fetchArticlesByTagAsync),
		yield takeLatest(articlesTypes.UPDATE_FAVORITE_ARTICLES_REQUEST, updateFavoriteArticlesAsync)
	]);
}
