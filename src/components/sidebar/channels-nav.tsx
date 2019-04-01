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
          <Link to={`/channel/${channel.slug}`} className="no-underline text-black text-sm">
            {channel.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
