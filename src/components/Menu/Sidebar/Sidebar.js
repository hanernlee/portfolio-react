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
  itemClick = () => {
    this.props.itemClick();
  }

  render() {
    return (
      <div style={styles.base}>
        <SidebarItem itemClick={this.itemClick} name="home" url="/" />
        <SidebarItem itemClick={this.itemClick} name="work" url="/work" />
        <SidebarItem itemClick={this.itemClick} name="contact" url="/contact" />
      </div>
    )
  }
}

export default Radium(Sidebar);
