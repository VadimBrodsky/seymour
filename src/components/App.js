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
          <div className="row">
            <div className="col-sm">
              <Feeds />
            </div>
            <div className="col-sm">Items</div>
            <div className="col-sm">Item</div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default App;
