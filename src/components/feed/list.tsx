import * as React from 'react';
import { Link } from 'react-router-dom';
import { AppState } from '../../reducers';

interface Props {
  items: AppState['items']['loaded'];
  baseUrl: string;
}

export default function FeedList({ items, baseUrl }: Props) {
  return (
    <ul className="list-reset">
      {items.map((item) => (
        <li key={item.slug} className="text-sm border-b-2 border-grey border-solid">
          <Link
            to={`${baseUrl}/${item.slug}`}
            className={`no-underline py-3 block ${ item.read ? 'text-grey-dark': 'text-black' }`}
          >
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
