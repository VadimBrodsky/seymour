import * as React from 'react';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import FeedList from './list';
import { handleReceiveItems } from '../../actions/items';

interface Props extends RouteComponentProps {
  items: Channel['channel']['items'];
  dispatch: any;
  selectedChannel: any;
}

function FeedMenu({ items, match, dispatch, selectedChannel }: Props) {
  React.useEffect(() => {
    selectedChannel.id && dispatch(handleReceiveItems(selectedChannel.id));
  }, []);

  return (
    <section className="w-1/3 bg-grey-light overflow-y-auto scroling-touch p-3">
      <header>
        <h1 className="text-lg">
          <Link className="no-underline text-black" to={match.url}>
            {selectedChannel.title}
          </Link>
        </h1>
        {items ? <FeedList items={items} /> : <p>loading...</p>}
      </header>
    </section>
  );
}

// @ts-ignore
const mapStateToProps = (state, props) => ({
  items: state.items.loaded,
  selectedChannel: state.channels.loaded.find(
    (channel: any) => channel.slug === props.match.params.feedId,
  ),
});

export default withRouter(connect(mapStateToProps)(FeedMenu));
