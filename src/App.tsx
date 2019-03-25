import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';

import { handleReceiveChannels } from './actions/channels';
import Navigation from './components/chrome/navigation';
import Chrome from './components/chrome';
import FeedMenu from './components/feed';
import Article from './components/article';

type Article = ArrayElement<Channel['channel']['items']>;

// @ts-ignore
function App(props) {
  useEffect(() => {
    props.dispatch(handleReceiveChannels());
  }, []);

  if (!props.channels) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Router>
      <Chrome>
        <Route
          path="/"
          render={() => (
            <Navigation>
              {props.channels.map((channel: any) => (
                <Link key={channel.id} to={`/channel/${channel.slug}`}>
                  {channel.title}
                </Link>
              ))}
            </Navigation>
          )}
        />

        <Route path="/channel/:feedId" render={(...props) => <FeedMenu {...props} />} />

        <Route
          path="/channel/:feedId/:articleId"
          render={(...props) => <Article {...props} />}
        />
      </Chrome>
    </Router>
  );
}

// @ts-ignore
const mapStateToProps = (state) => ({
  channels: state.channels.loaded,
  items: state.items.loaded,
});
export default connect(mapStateToProps)(App);
