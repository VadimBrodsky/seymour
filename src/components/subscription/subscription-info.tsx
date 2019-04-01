import * as React from 'react';
import { AppState } from '../../reducers';

interface Props {
  channel: NonNullable<AppState['channels']['newChannel']>;
  handleSubscribe: () => unknown;
  itemsLength?: number;
  lastPubDate?: string;
}

export default function SubscriptionInfo(props: Props) {
  return (
    <div className="px-6 py-4 bg-white my-5 rounded shadow-sm w-full max-w-md leading-normal">
      <h2 className="text-lg">{props.channel.title}</h2>
      <p className="italic text-grey-dark text-base"> {props.channel.description}</p>

      <ul className="py-3">
        {props.channel.items &&
          props.channel.items.map((item) => <li key={item.guid}>{item.title}</li>)}
      </ul>

      <div className="flex items-center justify-between mb-2">
        <p className="text-grey-dark">Last updated on {props.lastPubDate}</p>

        <button
          onClick={props.handleSubscribe}
          className="bg-blue text-lg shadow-md hover:bg-blue-dark text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
        >
          Subscribe
        </button>
      </div>
    </div>
  );
}
