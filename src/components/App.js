import React, { Fragment, Component } from 'react';
import './App.css';
import Navbar from './Navbar';
import Feeds from './Feeds';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Navbar />
        <div className="container">
          <Feeds />
        </div>
      </Fragment>
    );
  }
}

export default App;
