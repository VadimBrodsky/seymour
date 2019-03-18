import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import './stylesheets/tailwind.css';
import App from './App';
import reducer from './reducers';
import middleware from './middleware';
import * as serviceWorker from './serviceWorker';
import seedData from './services/seed';

//@ts-ignore
window.seedData = seedData;
const store = createStore(reducer, middleware);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
