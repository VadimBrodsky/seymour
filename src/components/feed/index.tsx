import * as React from 'react';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleReceiveItems, selectItems } from '../../actions/items';
import { selectCurrentChannel } from '../../actions/channels';
import FeedList from './list';
import FeedsWrapper from './wrapper';
import FeedsHeader from './header';
import Loading from '../shared/loading';
import { AppState } from '../../reducers';

interface Props extends RouteComponentProps {
  dispatch: any;
  channel?: AppState['channels']['loaded'][0];
  items?: AppState['items']['loaded'];
}

function Feeds({ channel, dispatch, items, match }: Props) {
  React.useEffect(
    () => {
      channel && dispatch(handleReceiveItems(channel.id));
    },
    [channel],
  );

  return !items || !channel ? (
    <Loading />
  ) : (
    <FeedsWrapper>
      <FeedsHeader title={channel.title} url={match.url} />
      <FeedList items={items} baseUrl={match.url} />
    </FeedsWrapper>
  );
}

const mapStateToProps = (
  state: AppState,
  props: RouteComponentProps<{ feedId: string }>,
) => ({
  channel: selectCurrentChannel(state, props.match.params.feedId),
  items: selectItems(state),
});

export default withRouter(connect(mapStateToProps)(Feeds));
