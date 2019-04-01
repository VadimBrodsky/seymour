import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../reducers';
import { handleLoadChannel, handleSubscribeToChannel, clearLoadedChannel } from '../../actions/channels';
import SubscriptionWrapper from './wrapper';
import SubscriptionLoader from './subscription-loader';
import SubscriptionInfo from './subscription-info';

interface Props {
  dispatch: (action: any) => any;
  error?: AppState['channels']['newChannelError'];
  itemsLength?: number;
  lastPubDate?: string;
  newChannel?: AppState['channels']['newChannel'];
}

function Subscription(props: Props) {
  const [url, setUrl] = React.useState('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (url !== '') {
      props.dispatch(handleLoadChannel(url));
    }
  };

  const onClear = () => {
    props.dispatch(clearLoadedChannel());
    setUrl('');
  }

  const handleSubscribe = () => {
    setUrl('');
    props.newChannel &&
      props.dispatch(handleSubscribeToChannel(props.newChannel, url));
  };

  return (
    <SubscriptionWrapper>
      <SubscriptionLoader
        value={url}
        onSubmit={onSubmit}
        onInputValue={setUrl}
        onClear={onClear}
        error={props.error}
      />

      {props.newChannel && (
        <SubscriptionInfo
          channel={props.newChannel}
          handleSubscribe={handleSubscribe}
          itemsLength={props.itemsLength}
          lastPubDate={props.lastPubDate}
        />
      )}
    </SubscriptionWrapper>
  );
}

const mapStateToProps = ({ channels: { newChannel, newChannelError } }: AppState) => {
  let itemsLength;
  let lastPubDate;

  if (newChannel && newChannel.items) {
    itemsLength =  newChannel.items.length;
    lastPubDate = new Date(newChannel.items[0].pubDate).toLocaleDateString();
  }

  return {
    error: newChannelError,
    itemsLength,
    lastPubDate,
    newChannel: newChannel,
  };
};

export default connect(mapStateToProps)(Subscription);
