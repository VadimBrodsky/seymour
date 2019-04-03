import * as React from 'react';
import { Link } from 'react-router-dom';
import { AppState } from '../../reducers';

interface Props {
  channels: AppState['channels']['loaded'];
}

export default function ChannelsNav({ channels }: Props) {
  return (
    <ul className="list-reset">
      {channels.map((channel) => (
        <li key={channel.id} className="mb-2">
          <Link
            to={`/channel/${channel.slug}`}
            className="no-underline text-black text-sm"
          >
            {channel.title}{' '}
          </Link>
          {channel.unreadCount > 0 && (
            <strong className="bg-grey-lighter rounded-full px-2 py-1 text-xs font-semibold text-grey-darker inline-block ml-2">
              {channel.unreadCount}
            </strong>
          )}
        </li>
      ))}
    </ul>
  );
}
