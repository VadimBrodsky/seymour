import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import ArticleWrapper from './wrapper';
import ArticleHeader from './header';
import ArticleFrame from './frame';
import Loading from '../shared/loading';
import { AppState } from '../../reducers';
import { handleMarkRead } from '../../actions/items';

interface Props {
  dispatch: (arg: any) => {};
  selectedArticle?: AppState['items']['loaded'][0];
}

function Article({ dispatch, selectedArticle }: Props) {
  React.useEffect(
    () => {
      if (selectedArticle && selectedArticle.read === 0) {
        dispatch(handleMarkRead(selectedArticle));
      }
    },
    [selectedArticle],
  );

  return !selectedArticle ? (
    <Loading />
  ) : (
    <ArticleWrapper>
      <ArticleHeader title={selectedArticle.title} />
      <ArticleFrame
        markup={selectedArticle.content || selectedArticle.description}
        title={selectedArticle.title}
      />
    </ArticleWrapper>
  );
}

function mapStateToProps(
  state: AppState,
  props: RouteComponentProps<{ articleId: string }>,
) {
  return {
    selectedArticle:
      state.items.loaded &&
      state.items.loaded.find(
        (item: AppState['items']['loaded'][0]) =>
          item.slug === props.match.params.articleId,
      ),
  };
}

export default withRouter(connect(mapStateToProps)(Article));
