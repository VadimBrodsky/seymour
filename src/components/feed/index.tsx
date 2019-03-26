import * as React from 'react';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import FeedList from './list';
import { handleReceiveItems } from '../../actions/items';

interface Props extends RouteComponentProps {
  items: Channel['channel']['items'];
  dispatch: any;
  selectedChannel?: any;

  channelId: string;
  channelTitle: string;
  loading: boolean;
}

function FeedMenu({ items, match, dispatch, channelTitle, channelId, loading }: Props) {
  if (loading) {
    return <p>loading...</p>;
  }

  React.useEffect(() => {
    dispatch(handleReceiveItems(channelId));
  }, [channelId]);

  return (
    <section className="w-1/3 bg-grey-light overflow-y-auto scroling-touch p-3">
      <header>
        <h1 className="text-lg">
          <Link className="no-underline text-black" to={match.url}>
            {channelTitle}
          </Link>
        </h1>
        {items ? <FeedList items={items} /> : <p>loading...</p>}
      </header>
    </section>
  );
}

// @ts-ignore
const mapStateToProps = (state, props) => {
  const foundArticle = state.channels.loaded.find(
    (channel: any) => channel.slug === props.match.params.feedId,
  );

  const fallbackId = state.channels.loaded.length ? state.channels.loaded[0].id : null;

  return {
    items: state.items.loaded,
    channelId: foundArticle ? foundArticle.id : fallbackId,
    channelTitle: foundArticle ? foundArticle.title : '',
    loading: !foundArticle && !fallbackId,
  };
};

export default withRouter(connect(mapStateToProps)(FeedMenu));
