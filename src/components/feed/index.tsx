import * as React from 'react';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import FeedList from './list';

interface Props extends RouteComponentProps {
  feedItems: Channel['channel']['items'];
}

function FeedMenu({ feedItems, match }: Props) {
  return (
    <section className="w-1/3 bg-grey-light overflow-y-auto scroling-touch p-3">
      <header>
        <h1 className="text-lg">
          <Link className="no-underline text-black" to={match.url}>
            Overreacted
          </Link>
        </h1>
        <FeedList items={feedItems} />
      </header>
    </section>
  );
}

export default withRouter(FeedMenu);
