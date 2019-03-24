import * as React from 'react';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import FeedList from './list';
import { handleReceiveItems } from '../../actions/items';

interface Props extends RouteComponentProps {
  items: Channel['channel']['items'];
  channels: any[];
  dispatch: any;
}

function FeedMenu({ items, match, channels, dispatch }: Props) {
  const currentFeed = channels.find(
    // @ts-ignore
    (channel: any) => channel.slug === match.params.feedId,
  );

  React.useEffect(() => {
    if (currentFeed.id) {
      dispatch(handleReceiveItems(currentFeed.id));
    }
  }, []);

  return (
    <section className="w-1/3 bg-grey-light overflow-y-auto scroling-touch p-3">
      <header>
        <h1 className="text-lg">
          <Link className="no-underline text-black" to={match.url}>
            {currentFeed.title}
          </Link>
        </h1>
        {items ? <FeedList items={items} /> : <p>loading...</p>}
      </header>
    </section>
  );
}

// @ts-ignore
const mapStateToProps = (state) => ({
  channels: state.channels.loaded,
  items: state.items.loaded,
});
export default connect(mapStateToProps)(withRouter(FeedMenu));
