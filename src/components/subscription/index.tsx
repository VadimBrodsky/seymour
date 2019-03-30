import * as React from 'react';
import { connect } from 'react-redux';
import db from '../../services/db';
import fetcher from '../../services/fetcher';
import rssParser from '../../services/rss-parser';
import { AppState } from '../../reducers';
import { handleLoadChannel, handleSubscribeToChannel } from '../../actions/channels';

interface Props {
  dispatch: (action: any) => any;
  error?: AppState['channels']['newChannelError'];
  itemsLength?: number;
  lastPubDate?: string;
  subscription?: AppState['channels']['newChannel'];
}

function Subscription(props: Props) {
  const inputRef = React.useRef(null);
  const [url, setUrl] = React.useState('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // @ts-ignore
    const val = inputRef.current.value;
    if (val !== '') {
      props.dispatch(handleLoadChannel(val));
      setUrl(val);
    }
  };

  const handleSubscribe = () => {
    // @ts-ignore
    inputRef.current.value = '';
    props.subscription &&
      props.dispatch(handleSubscribeToChannel(props.subscription, url));
  };

  return (
    <section className="w-5/6 bg-grey-light p-3">
      <h2 className="text-lg mb-1">Subscribe to a new RSS Channel</h2>
      <form className="" onSubmit={onSubmit}>
        <label htmlFor="url" className="block text-grey-darker text-sm font-bold mb-2">
          Feed URL
        </label>
        <input
          id="url"
          ref={inputRef}
          type="text"
          className="shadow appearance-none border rounded py-2 px-3 mr-1 text-grey-darker focus:outline-none focus:shadow-outline"
          placeholder="https://overreacted.io/rss.xml"
        />
        <button
          className="bg-blue shadow-md hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Load Feed
        </button>

        {props.error && <p className="text-red text-xs italic">{props.error}</p>}
      </form>

      {props.subscription && (
        <>
          <h2>{props.subscription.title}</h2>
          <p>{props.subscription.link}</p>
          <p>{props.subscription.description}</p>
          <p>
            feed has {props.itemsLength} items, last one posted on {props.lastPubDate}
          </p>
          <button
            onClick={handleSubscribe}
            className="bg-blue shadow-md hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Subscribe
          </button>
        </>
      )}
    </section>
  );
}

const mapStateToProps = ({ channels: { newChannel, newChannelError } }: AppState) => {
  let itemsLength;
  let lastPubDate;

  if (newChannel) {
    itemsLength = newChannel.items ? newChannel.items.length : undefined;
  }

  if (newChannel && newChannel.items) {
    lastPubDate = new Date(newChannel.items[0].pubDate).toLocaleDateString();
  }

  return {
    error: newChannelError,
    itemsLength,
    lastPubDate,
    subscription: newChannel,
  };
};

export default connect(mapStateToProps)(Subscription);
