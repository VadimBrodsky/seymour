import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { handleReceiveChannels } from './actions/channels';
import Article from './components/article';
import Chrome from './components/chrome';
import Feeds from './components/feed';
import Sidebar from './components/sidebar';
import Subscription from './components/subscription';
import { AppState } from './reducers';

interface Props {
  channels: AppState['channels']['loaded'];
  dispatch: Dispatch<any>;
}

function App({ channels, dispatch }: Props) {
  useEffect(() => {
    dispatch(handleReceiveChannels());
  }, []);

  return (
    <Router>
      <Chrome>
        <Route path="/" component={Sidebar} />
        <Route path="/" exact component={Subscription} />
        <Route path="/channel/:feedId" component={Feeds} />
        <Route path="/channel/:feedId/:articleId" component={Article} />
      </Chrome>
    </Router>
  );
}

const mapStateToProps = (state: AppState) => ({ channels: state.channels.loaded });
export default connect(mapStateToProps)(App);
