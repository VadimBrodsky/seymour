import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { handleReceiveChannels } from './actions/channels';
import { handleReceiveItems } from './actions/items';
import Article from './components/article';
import Chrome from './components/chrome';
import FeedMenu from './components/feed';
import Loading from './components/shared/loading';
import Sidebar from './components/sidebar';
import { AppState, RootActions } from './reducers';

interface Props {
  channels: AppState['channels']['loaded'];
  dispatch: Dispatch<any>;
}

function App({ channels, dispatch }: Props) {
  useEffect(() => {
    dispatch(handleReceiveChannels());
  }, []);

  if (!channels) {
    return <Loading />;
  }

  return (
    <Router>
      <Chrome>
        <Route path="/" component={Sidebar} />
        <Route path="/channel/:feedId" component={FeedMenu} />
        <Route path="/channel/:feedId/:articleId" component={Article} />
      </Chrome>
    </Router>
  );
}

const mapStateToProps = (state: AppState) => ({ channels: state.channels.loaded });
export default connect(mapStateToProps)(App);
