import React from 'react';
import ReactDOM from 'react-dom';
import './stylesheets/tailwind.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import DB from './services/db';

DB.channels.set({name: 'overreacted', url: 'https://overreacted.io/'})

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
