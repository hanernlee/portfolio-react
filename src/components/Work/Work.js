import React, { Component } from 'react';
import Radium from 'radium';

const styles = {
  base: {
    left:'0',
    position: 'relative',
    transition: 'left 0.4s ease-in-out',
    backgroundColor: 'red',

    '@media (min-width: 720px)': {
      paddingBottom: '80px'
    }
  }
}

class Work extends Component {
  render() {

    return (
      <div style={styles.base}>Work</div>
    );
  }
}

export default Radium(Work);
