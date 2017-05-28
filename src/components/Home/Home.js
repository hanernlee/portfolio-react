import React, { Component } from 'react';
import Radium from 'radium';
import Work from '../work/Work';

const styles = {
  base: {
    left:'0',
    position: 'relative',
    transition: 'left 0.4s ease-in-out',

    '@media (min-width: 720px)': {
      paddingBottom: '80px'
    }
  },
  container: {
    margin: '0px auto',
    maxWidth: '1360px',
    paddingLeft: '25px',
    paddingRight: '25px',
    '@media (min-width: 720px)': {
      paddingLeft: '40px',
      paddingRight: '40px'
    }
  },
  blocks: {
    width: '100%',
    height: '36px',
    '@media (min-width: 720px)': {
      height: '48px',
    }
  }
}

class Home extends Component {
  render() {

    return (
      <div style={styles.base}>
        <div style={styles.container}>
            <div style={styles.blocks}></div>
            <div>Hi, I'm Chris. Welcome to my page.</div>
            <div style={styles.blocks}></div>
            <Work />
        </div>
      </div>
    );
  }
}

export default Radium(Home);
