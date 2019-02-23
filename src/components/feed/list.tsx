import * as React from 'react';
import { Channel } from '../../services/rss-parser';

interface Props {
  items: Channel['channel']['items'];
  onSelect: (item: string) => any;
}

export default function FeedList({ items = [], onSelect }: Props) {
  return (
    <ul className="list-reset">
      {items.map((item) => (
        <li key={item.guid} className="py-3 text-sm border-b-2 border-grey border-solid">
          <a
            href="#"
            className="no-underline text-black"
            onClick={(e) => {
              onSelect(item.guid);
            }}
          >
            {item.title}
          </a>
        </li>
      ))}
    </ul>
  );
}
