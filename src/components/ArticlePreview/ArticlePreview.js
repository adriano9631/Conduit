import React, { useState } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import { updateFavoriteArticlesRequest } from 'redux/articleList/articleList.actions';

import * as S from './ArticlePreview.style';

import ArticleMeta from 'components/ArticleMeta/ArticleMeta';
import TagList from 'components/TagList/TagList';

function ArticlePreview({ articleData, isAuth, updateFavoriteArticlesRequest, fetchArticlesByTagRequest, push, i }) {
	const [ isParentHovered, toggleParentHover ] = useState(false);
	const { favorited, slug, title, description, favoritesCount, tagList } = articleData;
	const handleUpdateFavoriteArticleRequest = () => {
		if (isAuth) {
			updateFavoriteArticlesRequest(slug, favorited, favoritesCount);
		} else push('/signUp');
	};
	
	const variants = {
		animate: (i) => ({
			opacity: 1,
			transition: {
				delay: i * 0.05
			}
		}),
		initial: { opacity: 0 }
	};

	return (
		<S.ArticlePreviewContainer
			initial="initial"
			animate="animate"
			custom={i}
			variants={variants}
			onMouseEnter={() => toggleParentHover(true)}
			onMouseLeave={() => toggleParentHover(false)}
		>
			<ArticleMeta articleData={articleData} isParentHovered={isParentHovered} />
			<S.Wrapper>
				<S.Title to={`/article/${slug}`}>{title}</S.Title>
				<S.Text to={`/article/${slug}`}>{description}</S.Text>
				<S.ReadMore to={`/article/${slug}`}>Read more...</S.ReadMore>
			</S.Wrapper>
			<TagList tagList={tagList} fetchArticlesByTagRequest={fetchArticlesByTagRequest} />
			<S.UpdateFavoriteArticles favorited={favorited} onClick={handleUpdateFavoriteArticleRequest}>
				<S.HeartIcon favorited={favorited} />
				<S.FavoriteAddedCount favorited={favorited}>{favoritesCount}</S.FavoriteAddedCount>
			</S.UpdateFavoriteArticles>
		</S.ArticlePreviewContainer>
	);
}

const mapStateToProps = (state) => ({
	isAuth: state.user.isAuth
});

const mapDispatchToProps = (dispatch) => ({
	updateFavoriteArticlesRequest: (articleSlug, isFavorited, favoritesCount) =>
		dispatch(updateFavoriteArticlesRequest(articleSlug, isFavorited, favoritesCount)),
	push: (path) => dispatch(push(path))
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticlePreview);
