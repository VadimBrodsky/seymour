import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './stylesheets/tailwind.css';
import App from './App';
import reducer from './reducers';
import middleware from './middleware';
import * as serviceWorker from './serviceWorker';
import seedData from './services/seed';
import startFeedSync, { syncFeedsWorker } from './services/feed-sync.worker';
import { FEED_SYNC_INTERVAL } from './utils/config';

//@ts-ignore
window.seedData = seedData;

//@ts-ignore
window.syncFeedsWorker = syncFeedsWorker;
startFeedSync(FEED_SYNC_INTERVAL);

const store = createStore(reducer, middleware);

type AppStore = typeof store;

const Root = ({ store }: { store: AppStore }) => (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(<Root store={store} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
