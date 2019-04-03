import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import ArticleWrapper from './wrapper';
import ArticleHeader from './header';
import ArticleFrame from './frame';
import Loading from '../shared/loading';
import { AppState } from '../../reducers';
import { handleMarkRead, selectCurrentItem } from '../../actions/items';
import { handleUpdateReadCount, selectCurrentChannel } from '../../actions/channels';

interface Props {
  dispatch: (arg: any) => {};
  selectedArticle?: AppState['items']['loaded'][0];
  selectedChannel?: AppState['channels']['loaded'][0];
}

function Article({ dispatch, selectedArticle, selectedChannel }: Props) {
  React.useEffect(
    () => {
      if (selectedArticle && selectedArticle.read === 0 && selectedChannel) {
        dispatch(handleMarkRead(selectedArticle));
        dispatch(handleUpdateReadCount(selectedChannel.id));
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

const mapStateToProps = (
  state: AppState,
  props: RouteComponentProps<{ articleId: string; feedId: string }>,
) => ({
  selectedArticle: selectCurrentItem(state, props.match.params.articleId),
  selectedChannel: selectCurrentChannel(state, props.match.params.feedId),
});

export default withRouter(connect(mapStateToProps)(Article));
