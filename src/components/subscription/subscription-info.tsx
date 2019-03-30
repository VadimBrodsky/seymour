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
    <>
      <h2>{props.channel.title}</h2>
      <p>{props.channel.link}</p>
      <p>{props.channel.description}</p>
      <p>
        feed has {props.itemsLength} items, last one posted on {props.lastPubDate}
      </p>
      <button
        onClick={props.handleSubscribe}
        className="bg-blue shadow-md hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
      >
        Subscribe
      </button>
    </>
  );
}
