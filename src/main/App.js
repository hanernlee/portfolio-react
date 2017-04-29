import React, { Component } from 'react';
import {StyleRoot} from 'radium';
import Navbar from '../components/Navbar/Navbar'

class App extends Component {
  render() {
    return (
      <StyleRoot>
        <Navbar />
      </StyleRoot>
    )
  }
}

export default App;
