import React from 'react';
import ReactDOM from 'react-dom';
import './stylesheets/tailwind.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import seedData from './services/seed';
import db from './models/pouch' ;

console.log(db);

//@ts-ignore
window.seedData = seedData;

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
