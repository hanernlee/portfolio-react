import React, { Component } from 'react';
import Radium from 'radium';
import DisplayDashboard from './display/displayDashboard';
import DisplayMenu from './display/displayMenu';


const styles = {
  base: {
    left:'0',
    position: 'relative',
    transition: 'left 0.4s ease-in-out',
  },
  container: {
    display: 'flex',
    margin: '0px auto',
    maxWidth: '1360px',
  }
}

class Dashboard extends Component {
  render() {
    return (
      <div style={styles.base}>
          <div style={styles.container}>
            <DisplayDashboard />
            <DisplayMenu/>
          </div>
      </div>
    );
  }
}

export default Radium(Dashboard);
