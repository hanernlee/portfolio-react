import React, { Component } from 'react';
import Radium from 'radium';
import SidebarItem from '../SidebarItem/SidebarItem';

const styles = {
  base: {
    margin: '0 auto',
    width: '40%',
    textAlign: 'center'
  }
}

class Sidebar extends Component {
  render() {
    return (
      <div style={styles.base}>
        <SidebarItem name="home" url="/" />
        <SidebarItem name="work" url="/work" />
        <SidebarItem name="contact" url="/contact" />
      </div>
    )
  }
}

export default Radium(Sidebar);
