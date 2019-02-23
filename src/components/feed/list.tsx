import * as React from 'react';
import { Channel } from '../../services/rss-parser';

interface Props {
  items: Channel['channel']['items'];
  dispatchSelect: (item: string) => unknown;
}

export default function FeedList({ items = [], dispatchSelect }: Props) {
  return (
    <ul className="list-reset">
      {items.map((item) => (
        <li key={item.guid} className="text-sm border-b-2 border-grey border-solid">
          <a
            href="#"
            className="no-underline text-black py-3 block "
            onClick={(e) => {
              dispatchSelect(item.guid);
            }}
          >
            {item.title}
          </a>
        </li>
      ))}
    </ul>
  );
}
