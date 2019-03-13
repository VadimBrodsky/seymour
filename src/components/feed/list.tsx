import * as React from 'react';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';

interface Props extends RouteComponentProps {
  items: Channel['channel']['items'];
}

function FeedList({ items = [], match }: Props) {
  return (
    <ul className="list-reset">
      {items.map((item) => (
        <li key={item.id} className="text-sm border-b-2 border-grey border-solid">
          <Link
            to={`${match.url}/${item.id}`}
            className="no-underline text-black py-3 block "
          >
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default withRouter(FeedList);
