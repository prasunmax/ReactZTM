import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import HomePage from './pages/homepage/homepage.component';

class App extends Component {
  render() {
    return <div className='App'>
      <Switch>
        <Route exact path="/" component={HomePage} />
      </Switch>
    </div>;
  }
}

export default App;
