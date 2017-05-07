import React, { Component } from 'react';
import { StyleRoot } from 'radium';
import Navbar from '../components/Navbar/Navbar';
import Home from '../components/Home/Home';
import { BrowserRouter as Router, Route} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <StyleRoot>
        <Router>
          <Navbar />
        </Router>
      </StyleRoot>
    )
  }
}

export default App;
