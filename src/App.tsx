import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';

import { handleReceiveChannels } from './actions/channels';
import Navigation from './components/chrome/navigation';
import Chrome from './components/chrome';
import FeedMenu from './components/feed';
import Article from './components/article';
import { AppState, RootActions } from './reducers'

interface Props {
  channels: AppState['channels']['loaded'];
  dispatch: Dispatch<any>;
}

function App({ channels, dispatch }: Props) {
  useEffect(() => {
    dispatch(handleReceiveChannels());
  }, []);

  if (!channels) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Router>
      <Chrome>
        <Route path="/" component={Navigation} />
        <Route path="/channel/:feedId" component={FeedMenu} />
        <Route path="/channel/:feedId/:articleId" component={Article} />
      </Chrome>
    </Router>
  );
}

const mapStateToProps = (state: AppState) => ({ channels: state.channels.loaded });
export default connect(mapStateToProps)(App);
