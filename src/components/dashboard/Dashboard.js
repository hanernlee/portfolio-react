import React, { Component } from 'react';
import Radium from 'radium';

const styles = {
  base: {
    left:'0',
    position: 'relative',
    transition: 'left 0.4s ease-in-out',
    backgroundColor: 'yellow',

    '@media (min-width: 720px)': {
      paddingBottom: '80px'
    }
  }
}

class Dashboard extends Component {
  render() {
    return (
      <div style={styles.base}>Dashboard</div>
    );
  }
}

export default Radium(Dashboard);
