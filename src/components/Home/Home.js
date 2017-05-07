import React, { Component } from 'react';
import Radium from 'radium';

const styles = {
  base: {
    left:'0',
    position: 'relative',
    transition: 'left 0.4s ease-in-out',
    backgroundColor: 'green',

    '@media (min-width: 720px)': {
      paddingBottom: '80px'
    }
  }
}

class Home extends Component {
  render() {

    return (
      <div style={styles.base}>Home</div>
    );
  }
}

export default Radium(Home);
