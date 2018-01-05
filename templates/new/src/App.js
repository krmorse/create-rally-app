import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Components, View } from 'rally-sdk';

import './App.scss';

class App extends Component {

  static propTypes = {
    context: ImmutablePropTypes.map.isRequired
  };

  render() {
    return <div className="app"></div>;
  }
}


export default App;