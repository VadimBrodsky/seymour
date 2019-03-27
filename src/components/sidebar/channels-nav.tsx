import * as React from 'react';
import { Link } from 'react-router-dom';
import { AppState } from '../../reducers';

interface Props {
  channels: AppState['channels']['loaded'];
}

export default function ChannelsNav({ channels }: Props) {
  return (
    <ul>
      {channels.map((channel) => (
        <li key={channel.id}>
          <Link to={`/channel/${channel.slug}`}>
            {channel.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
